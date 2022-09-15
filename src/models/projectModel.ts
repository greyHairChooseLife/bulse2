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
				name: ele.R_name,
				mobileNumber: ele.R_mobileNumber,
			}]
			});
		}else{
			filtered.splice(foundIdx, 1, {project: {...filtered[foundIdx].project}, reservation: [...filtered[foundIdx].reservation, {
				id: ele.R_id,
				device: ele.R_device,
				payment: ele.R_payment,
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

export = {
	getProjectByDate: getProjectByDate,
	getProjectByMonth: getProjectByMonth,
	postProject: postProject,
	updateLikeCount: updateLikeCount,
}
