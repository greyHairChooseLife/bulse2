const db = require('../config/db').promise();

const getProjectByDate = async (theDay: string) => {
	const [result] = await db.query(`SELECT * FROM project WHERE date='${theDay}' AND NOT status LIKE 'bro%'`);
	return result;
};


type projectType = {
	project: {
		date: string,
		session: number,
		id: number,
		name: string,
		mobileNumber: string,
		subject: string,
		content: string,
		status: string,
		exposeCount: number,
		likeCount: number
	},
	reservation: {
		id: number,
		device: string,
		payment: boolean,
		name: string,
		mobileNumber: string
	}[]
}
const getProjectByMonth = async (theMonth: string) => {
	const [result] = await db.query(`SELECT 
		p.date as P_date,
		p.session as P_session,
		p.id as P_id,
		p.name as P_name,
		p.mobile_number as P_mobileNumber,
		p.subject as P_subject,
		p.content as P_content,
		p.status as P_status,
		p.expose_count as P_exposeCount,
		p.like_count as P_likeCount,

		r.id as R_id,
		r.device as R_device,
		r.payment as R_payment,
		r.check_payment as R_checkPayment,
		r.name as R_name,
		r.mobile_number as R_mobileNumber

		FROM project AS p LEFT OUTER JOIN reservation AS r ON p.id = r.project_id WHERE DATE_FORMAT(p.date, '%m')='${theMonth}' AND NOT status LIKE 'bro%'`);

	const filtered: any[] = [];
	result.forEach((ele: any) => {
		const foundIdx = filtered.findIndex(e => e.project.id === ele.P_id);
		if(foundIdx === -1){
			filtered.push({project: {
				date: ele.P_date,
				session: ele.P_session,
				id: ele.P_id,
				name: ele.P_name,
				mobileNumber: ele.P_mobileNumber,
				subject: ele.P_subject,
				content: ele.P_content,
				status: ele.P_status,
				exposeCount: ele.P_exposeCount,
				likeCount: ele.P_likeCount 
			}, reservation: [{
				id: ele.R_id,
				device: ele.R_device,
				payment: ele.R_payment,
				check_payment: ele.R_checkPayment,
				name: ele.R_name,
				mobileNumber: ele.R_mobileNumber,
			}]
			});
		}else{
			filtered.splice(foundIdx, 1, {project: {...filtered[foundIdx].project}, reservation: [...filtered[foundIdx].reservation, {
				id: ele.R_id,
				device: ele.R_device,
				payment: ele.R_payment,
				check_payment: ele.R_checkPayment,
				name: ele.R_name,
				mobileNumber: ele.R_mobileNumber,
			}]});
		}
	})
	//console.log('sex: ', filtered, filtered.length, 'and... ', filtered[0].reservation.length, '/', filtered[1].reservation.length, '/', filtered[2].reservation.length, '/', filtered[3].reservation.length, '/');
	return filtered.sort((a, b) => {
		if(a.project.date-b.project.date !== 0) return a.project.date-b.project.date
		else return a.project.session-b.project.session
	})
};


const getUserRecord = async (when: string, who: any) => {
	const name = who.split('"')[3];
	const mobileNumber = who.split('"')[7];
	
	//const [proposal] = await db.query(`SELECT * FROM project WHERE date_format(date, '%Y') = '${when}' AND name='${name}' AND mobile_number='${mobileNumber}'`);
	//	user가 제안한 모든 프로젝트(금년)
	const [proposal] = await db.query(`SELECT *, project.id AS id, bp.id as bp_id FROM project LEFT OUTER JOIN broken_project AS bp ON project.id = bp.project_id WHERE date_format(date, '%Y') = '${when}' AND name='${name}' AND mobile_number='${mobileNumber}'`);
	//	user가 예약한 모든 프로젝트(금년, broken project 포함)
	const [reservation] = await db.query(`SELECT 
		p.date as P_date,
		p.session as P_session,
		p.id as P_id,
		p.name as P_name,
		p.mobile_number as P_mobileNumber,
		p.subject as P_subject,
		p.content as P_content,
		p.status as P_status,
		p.expose_count as P_exposeCount,
		p.like_count as P_likeCount,

		r.id as R_id,
		r.device as R_device,
		r.payment as R_payment,
		r.check_payment as R_checkPayment,
		r.name as R_name,
		r.mobile_number as R_mobileNumber

		FROM reservation AS r LEFT OUTER JOIN project AS p ON p.id = r.project_id WHERE r.name='${name}' AND r.mobile_number='${mobileNumber}' AND DATE_FORMAT(p.date, '%Y')='${when}'`);

	return {proposal: proposal.sort((a: any, b: any) => {
		if(a.date - b.date !== 0) return a.date - b.date
		else return a.session - b.session
	}), reservation: reservation.sort((a: any, b: any) => {
		if(a.P_date - b.P_date !== 0) return a.P_date - b.P_date
		else return a.P_session - b.P_session
	})};
};


interface InewProject {
	identity: {name: string, mobileNumber: string},
	subject: string,
	content: string,
	theDay: Date,
	session: number,
}
const postProject = async (proposedData: InewProject ) => {
	const {identity, subject, content, theDay, session} = proposedData; 

	const result = await db.query(`INSERT INTO project (name, mobile_number, status, subject, content, date, session) VALUES(?, ?, ?, ?, ?, ?, ?)`, [identity.name, identity.mobileNumber, 'pending', subject, content, theDay, session]);

	return result;
}

type updateLikeCountPropType = {theDay: string, session: number}
const updateLikeCount = async ( props: updateLikeCountPropType ) => {
	const { theDay, session } = props;

	const result = await db.query(`UPDATE project SET like_count = like_count+1 WHERE date='${theDay}' AND session=${session}`);

	return result;
}


const updateProjectStatus = async (props: {byWhom: string, toDo: string, projectId: number, comment: string}) => {
	let newStatus: string | undefined = undefined;
	if(props.byWhom === 'admin'){
		switch(props.toDo){
			case 'approve':
				newStatus = 'recruiting';
				break;
			case 'reject':
				newStatus = 'broken';
				await db.query(`INSERT INTO broken_project (project_id, executor, broke_on, comment) VALUES(?, ?, ?, ?)`, [props.projectId, props.byWhom, 'pending', props.comment]);
				break;
			case 'cancel':
				newStatus = 'broken';
				await db.query(`INSERT INTO broken_project (project_id, executor, broke_on, comment) VALUES(?, ?, ?, ?)`, [props.projectId, props.byWhom, 'pending', props.comment]);
				break;
		}
	}

	const result = await db.query(`UPDATE project SET status = '${newStatus}' WHERE id='${props.projectId}'`);

	return result;
}

const deleteProject = async (projectId: number, projectStatus: string) => {
	const result = await db.query(`UPDATE project SET status = 'broken' WHERE id=${projectId}`);
	await db.query(`INSERT INTO broken_project (project_id, executor, broke_on, comment) VALUES(?, ?, ?, ?)`, [projectId, 'proponent', projectStatus, 'self break']);

	return result;
}

export = {
	getProjectByDate: getProjectByDate,
	getProjectByMonth: getProjectByMonth,
	getUserRecord: getUserRecord,
	postProject: postProject,
	updateLikeCount: updateLikeCount,
	updateProjectStatus: updateProjectStatus,
	deleteProject: deleteProject,
}
