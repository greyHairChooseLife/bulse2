import { Request, Response } from 'express'
import adminModel from '../models/adminModel';

const login = async (req: Request, res: Response) => {
	const result = await adminModel.login({...req.query});
	
	return res.json(result);
}

export = {
	login: login,
}

