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

const updateReservation = async (req: Request, res: Response) => {
	let result;
	if(req.body.payment) result = await reservationModel.updateReservation(req.body.RID, {payment: true});

	return res.json(result);
}

const askCheckPayment = async (req: Request, res: Response) => {
	let result;
	if(req.body.deny) result = await reservationModel.askCheckPayment(req.body.RID, true);
	else result = await reservationModel.askCheckPayment(req.body.RID, false);

	return result;
}

const deleteReservation = async (req: Request, res: Response) => {
	const result = await reservationModel.deleteReservation({reservationId: req.body.reservationId});

	return result;
}


export = {
	getReservation: getReservation,
	postReservation: postReservation,
	updateReservation: updateReservation,
	askCheckPayment: askCheckPayment,
	deleteReservation: deleteReservation,
}

