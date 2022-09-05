import { Request, Response } from 'express'
import reservationModel from '../models/reservationModel';
import projectModel from '../models/projectModel';

//const getReservationByDate = async (req: Request, res: Response) => {
//	const theDay = req.query.theDay;
//	let result = null;
//	if(typeof theDay === 'string') result = await reservationModel.getreservationByDate(theDay);
//	
//	return res.json(result);
//}

const postReservation = async (req: Request, res: Response) => {
	const { theDay, sessionNumber, name, mobileNumber, device } = req.body;

	const projectByDate = await projectModel.getProjectByDate(theDay);

	//console.log(projectByDate);
	const sessionMatch = projectByDate.find((ele: any) => ele.session === sessionNumber);

	//console.log('pussy: ', req.body);
	const result = await reservationModel.postReservation({projectId: sessionMatch.id, name: name, mobileNumber: mobileNumber, device: device});

	return res.json(result);
}

//const updateLikeCount = async (req: Request, res: Response) => {
//	// req.body is object : {theDay: string, session: number}
//
//	const affected = {
//		ip: req.ip,
//		item: [req.body.theDay, req.body.session]
//	};
//
//	const result = await reservationModel.updateLikeCount(req.body);
//
//	return res.json({updateResult: result, affected: affected});
//}

export = {
//	getreservationByDate: getreservationByDate,
	postReservation: postReservation,
//	updateLikeCount: updateLikeCount,
}

