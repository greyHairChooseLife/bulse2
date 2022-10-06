import { Request, Response } from 'express'
import projectModel from '../models/projectModel';

const getProjectByDate = async (req: Request, res: Response) => {
	const theDay = req.query.theDay;
	let result = null;
	if(typeof theDay === 'string') result = await projectModel.getProjectByDate(theDay);
	
	return res.json(result);
}

const getProjectByMonth = async (req: Request, res: Response) => {
	const theMonth = req.query.theMonth;
	let result = null;
	if(typeof theMonth === 'string') result = await projectModel.getProjectByMonth(theMonth);
	
	return res.json(result);
}

const getUserRecord = async (req: Request, res: Response) => {
	const when = req.query.when;
	const who = req.query.who;
	let result = null;
	if(typeof when === 'string') result = await projectModel.getUserRecord(when, who);

	return res.json(result);
}

const postProject = async (req: Request, res: Response) => {
	const proposedData = req.body;

	const result = await projectModel.postProject(proposedData);

	return res.json(result);
}

const updateLikeCount = async (req: Request, res: Response) => {
	// req.body is object : {theDay: string, session: number}

	const affected = {
		ip: req.ip,
		item: [req.body.theDay, req.body.session]
	};

	const result = await projectModel.updateLikeCount(req.body);

	return res.json({updateResult: result, affected: affected});
}

const updateProjectStatus = async (req: Request, res: Response) => {
	const result = await projectModel.updateProjectStatus(req.body)

	return res.json(result);
}

const deleteProject = async (req: Request, res: Response) => {
	const result = await projectModel.deleteProject(req.body.projectId, req.body.projectStatus)

	return res.json(result);
}

export = {
	getProjectByDate: getProjectByDate,
	getProjectByMonth: getProjectByMonth,
	getUserRecord: getUserRecord,
	postProject: postProject,
	updateLikeCount: updateLikeCount,
	updateProjectStatus: updateProjectStatus,
	deleteProject: deleteProject,
}

