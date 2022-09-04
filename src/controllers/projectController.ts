import { Request, Response } from 'express'
import projectModel from '../models/projectModel';

const getProjectByDate = async (req: Request, res: Response) => {
	const theDay = req.query.theDay;
	let result = null;
	if(typeof theDay === 'string') result = await projectModel.getProjectByDate(theDay);
	
	return res.json(result);
}

const postProject = async (req: Request, res: Response) => {
	const proposedData = req.body;

	const result = await projectModel.postProject(proposedData);

	return res.json(result);
}

const updateLikeCount = async (req: Request, res: Response) => {
	// req.body is object : {theDay: string, session: number}
	const result = await projectModel.updateLikeCount(req.body);

	return res.json(result);
}

export = {
	getProjectByDate: getProjectByDate,
	postProject: postProject,
	updateLikeCount: updateLikeCount,
}

