const db = require('../config/db').promise();

const getProjectByDate = async (theDay: string) => {
	const [result] = await db.query(`SELECT * FROM project WHERE date='${theDay}'`);
	return result;
};

//interface INewProject {
//	registerDate: Date,
//	identityName: string
//	identityMobileNumber: string
//	projectDate: Date
//	projectTime: number
//	projectHour: number
//	projectSubject: string
//	projectKeyword?: string
//	projectDescription: string
//	bankAccount: number
//	bankHost: string
//	bankHolderName: string
//	id: number
//}
//
//const postProject = async ( form: INewProject ) => {
//	const {registerDate, identityName, identityMobileNumber, projectDate, projectTime, projectHour, projectSubject, projectDescription, bankAccount, bankHost, bankHolderName, projectKeyword} = form; 
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
//	const result = await db.query(`INSERT INTO project (registered_datetime, mobile_number, name, project_subject, project_description, project_keyword, project_date, project_time, project_hour, bank_account, bank_host, bank_holder_name) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [formattedRegisterDate, identityMobileNumber, identityName, projectSubject, projectDescription, projectKeyword, formattedProjectDate, projectTime, projectHour, bankAccount, bankHost, bankHolderName]);
//
//	return result;
//}
//
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
//	postProject: postProject,
//	updateProject: updateProject,
}
