import { Request, Response } from 'express'
import reservationModel from '../models/reservationModel';
import projectModel from '../models/projectModel';

const getReservation = async (req: Request, res: Response) => {
	const filter = {...req.body, ...req.query};
	let result = null;
	result = await reservationModel.getReservation(filter);

	return res.json(result);
}

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
	getReservation: getReservation,
	postReservation: postReservation,
//	updateLikeCount: updateLikeCount,
}

