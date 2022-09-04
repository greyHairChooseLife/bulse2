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

type updateLikeCountPropType = {theDay: string, session: number}
const updateLikeCount = async ( props: updateLikeCountPropType ) => {

	const { theDay, session } = props;

	const result = await db.query(`UPDATE project SET like_count = like_count+1 WHERE date='${theDay}' AND session=${session}`);

	return result;
}

export = {
	getProjectByDate: getProjectByDate,
	postProject: postProject,
	updateLikeCount: updateLikeCount,
}
