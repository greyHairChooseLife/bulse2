const db = require('../config/db').promise();

const getProjectByDate = async (theDay: string) => {
	const [result] = await db.query(`SELECT * FROM project WHERE date='${theDay}'`);
	return result;
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

//const updateProject = async ( form: INewProject ) => {
//	const {id, registerDate, projectDate, projectTime, projectHour, projectSubject, projectDescription, bankAccount, bankHost, bankHolderName, projectKeyword} = form; 
//
//	//	한국 기준 시간으로 조정 : +9 시간
//	const registerDateOrigin = new Date(registerDate);
//	const projectDateOrigin = new Date(projectDate);
//	registerDateOrigin.setHours(registerDateOrigin.getHours()+9);
//	projectDateOrigin.setHours(projectDateOrigin.getHours()+9);
//	//	mariadb의 datetime 데이터 타입에 맞게 형식 변환
//	const formattedRegisterDate = registerDateOrigin.toISOString().slice(0, 19).replace('T', ' ');
//	const formattedProjectDate = projectDateOrigin.toISOString().slice(0, 19).replace('T', ' ');
//
//	const result = await db.query(`UPDATE project SET registered_datetime='${formattedRegisterDate}', project_subject='${projectSubject}', project_description='${projectDescription}', project_keyword='${projectKeyword}', project_date='${formattedProjectDate}', project_time='${projectTime}', project_hour='${projectHour}', bank_account='${bankAccount}', bank_host='${bankHost}', bank_holder_name='${bankHolderName}' WHERE id=${id}`);
//
//	return result;
//}

export = {
	getProjectByDate: getProjectByDate,
	postProject: postProject,
//	updateProject: updateProject,
}
