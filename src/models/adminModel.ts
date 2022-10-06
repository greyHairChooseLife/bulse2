const db = require('../config/db').promise();

// type of props: {name: string, mobileNumber: string, identification: string}
const login = async (props: any) => {
	const [result] = await db.query(`SELECT name, mobile_number, identification FROM admin ORDER BY id DESC LIMIT 1`);
	const key = {...props};
	const lock = {...result[0]};

	let login: boolean = false;
	if(key.name === lock.name) if(key.mobileNumber === lock.mobile_number) if(key.identification === lock.identification) login = true;
	
	return login;
}

const getProjectByDate = async (theDay: string) => {
	const [result] = await db.query(`SELECT * FROM project WHERE date='${theDay}' AND NOT status LIKE 'bro%'`);
	return result;
};

export = {
	login: login,
}
