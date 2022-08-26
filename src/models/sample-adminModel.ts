const db = require('../config/db').promise();

const getNowForDB = () => {
	const now = new Date();
	const year = now.getFullYear();
	const month = ('0' + (now.getMonth() + 1)).slice(-2);
	const day = ('0' + now.getDate()).slice(-2);
	const hours = ('0' + now.getHours()).slice(-2); 
	const minutes = ('0' + now.getMinutes()).slice(-2);
	const seconds = ('0' + now.getSeconds()).slice(-2); 

	return year + '-' + month  + '-' + day + ' ' + hours + ':' + minutes  + ':' + seconds;
}

const getLast = async () => {

	//const [result] = await db.query(`SELECT nickname, status FROM admin ORDER BY id DESC LIMIT 1`);
	const [result] = await db.query(`SELECT nickname, status FROM admin WHERE status=1`);

	return result[0];
};

const beforeLogin = async () => {
	const result = await db.query(`SELECT login_id FROM admin ORDER BY id DESC LIMIT 1`);

	return result[0][0].login_id;
}

const afterLogin = async () => {
	const result = await db.query(`SELECT * FROM admin ORDER BY id DESC LIMIT 1`);

	return result[0][0];
}

const register = async (data: any) => {
	const { id, name, mobileNumber } = data;

	await db.query(`INSERT INTO admin (login_id, nickname, mobile_number, status, register) VALUES('${id}', '${name}', '${mobileNumber}', 1, '${getNowForDB()}')`);
}

const deregister = (id: number) => {
	db.query(`UPDATE admin SET status='2', deregister='${getNowForDB()}' WHERE id=${id}`);
}

export = {
	getLast: getLast,
	beforeLogin: beforeLogin,
	afterLogin: afterLogin,
	register: register,
	deregister: deregister,
}
