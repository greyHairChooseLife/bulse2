import { Request, Response } from 'express'
import reservationModel from '../models/reservationModel';
import projectModel from '../models/projectModel';

const getReservation = async (req: Request, res: Response) => {
	const filter = {...req.query};
	let result = null;
	result = await reservationModel.getReservation(filter);

	return res.json(result);
}

const postReservation = async (req: Request, res: Response) => {
	const { theDay, sessionNumber, name, mobileNumber, device } = req.body;

	const projectByDate = await projectModel.getProjectByDate(theDay);

	const sessionMatch = projectByDate.find((ele: any) => ele.session === sessionNumber);

	const result = await reservationModel.postReservation({projectId: sessionMatch.id, name: name, mobileNumber: mobileNumber, device: device});

	return res.json(result);
}

const deleteReservation = async (req: Request, res: Response) => {
	const result = await reservationModel.deleteReservation({reservationId: req.body.reservationId});

	return result;
}


export = {
	getReservation: getReservation,
	postReservation: postReservation,
	deleteReservation: deleteReservation,
}

