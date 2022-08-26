import { Request, Response } from 'express'
import adminModel from '../models/adminModel';

const getLast = async (req: Request, res: Response) => {
	const result = await adminModel.getLast();
	
	return res.json(result);
}

const login = async (req: Request, res: Response) => {
	const loginSolution = await adminModel.beforeLogin();
	const loginTry = req.body.proposed;

	let returnValue;
	if(loginSolution === loginTry){
		returnValue = {
			msg: 'login success',
			value: await adminModel.afterLogin()
		}
	}else{
		returnValue = {
			msg: 'login fail',
			value: null
		}
	}

	return res.json(returnValue);
}

const register = async (req: Request, res: Response) => {
	await adminModel.register(req.body.data);
}

const deregister = async (req: Request, res: Response) => {
	adminModel.deregister(req.body.id);
}

export = {
	getLast: getLast,
	login: login,
	register: register,
	deregister: deregister,
}

