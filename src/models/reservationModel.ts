const db = require('../config/db').promise();

type getReservationPropsType = any
const getReservation = async (props: getReservationPropsType) => {
	//console.log('model: ', props);
	//	theDay 필터링 : project table에서 해당 '월'의 모든 id값을
	//	name, mobileNumber 필터링 : reservation table에서 해당 계정의 모든 project_id값을
	//	비교하여 일치하는 것만 return
	let date = props.theDay.split('-').map((ele: any, idx: number) => {if(idx<2) return ele}).join('-').slice(0, -1);

	const [result] = await db.query(`SELECT 
		r.id as RId,
		r.device as Rdevice,
		r.payment as Rpayment,
		p.id as PId,
		p.subject as Psubject,
		p.name as Pname,
		p.date as Pdate,
		p.session as Psession
		FROM project AS p JOIN reservation AS r ON p.id = r.project_id AND r.name='${props.name}' AND r.mobile_number='${props.mobileNumber}' AND DATE_FORMAT(p.date, '%Y-%m')='${date}'`);

	return result;
};


interface IpostReservation {
	projectId: number
	name: string
	mobileNumber: string
	device: string
}
const postReservation = async (props: IpostReservation ) => {
	const {projectId, name, mobileNumber, device} = props;

	const result = await db.query(`INSERT INTO reservation (project_id, name, mobile_number, device) VALUES(?, ?, ?, ?)`, [projectId, name, mobileNumber, device]);

	return result;
}


interface IdeleteReservation {
	reservationId: number
}
const deleteReservation = async (props: IdeleteReservation) => {
	const result = await db.query(`DELETE FROM reservation where id=${props.reservationId}`);

	return result;
}

export = {
	getReservation: getReservation,
	postReservation: postReservation,
	deleteReservation: deleteReservation,
}
