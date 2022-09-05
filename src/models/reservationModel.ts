const db = require('../config/db').promise();

//const getReservationByDate = async (theDay: string) => {
//	const [result] = await db.query(`SELECT * FROM reservation WHERE date='${theDay}'`);
//	return result;
//};

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

//type updateLikeCountPropType = {theDay: string, session: number}
//const updateLikeCount = async ( props: updateLikeCountPropType ) => {
//
//	const { theDay, session } = props;
//
//	const result = await db.query(`UPDATE reservation SET like_count = like_count+1 WHERE date='${theDay}' AND session=${session}`);
//
//	return result;
//}

export = {
	//getReservationByDate: getReservationByDate,
	postReservation: postReservation,
	//updateLikeCount: updateLikeCount,
}
