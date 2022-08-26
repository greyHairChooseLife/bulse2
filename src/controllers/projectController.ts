import { Request, Response } from 'express'
import projectModel from '../models/projectModel';

const getProjectByDate = async (req: Request, res: Response) => {
	const theDay = req.query.theDay;
	let result = null;
	if(typeof theDay === 'string') result = await projectModel.getProjectByDate(theDay);
	
	return res.json(result);
}

//const postProject = async (req: Request, res: Response) => {
//	const handOver = req.body;
//
//	const result = await projectModel.postProject(handOver);
//
//	return res.json(result);
//}
//
//const updateProject = async (req: Request, res: Response) => {
//	const handOver = req.body;
//
//	const result = await projectModel.updateProject(handOver);
//
//	return res.json(result);
//}

export = {
	getProjectByDate: getProjectByDate,
//	postProject: postProject,
//	updateProject: updateProject,
}

