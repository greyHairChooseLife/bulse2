import express from 'express';
import adminController from '../controllers/adminController';

const router = express.Router();

router.get('/login', adminController.login);
//router.get('/month', projectController.getProjectByMonth);
//router.get('/userRecord', projectController.getUserRecord);
//router.post('', projectController.postProject);
//router.put('/likeCount', projectController.updateLikeCount);
//router.put('/status', projectController.updateProjectStatus);
//router.put('', projectController.updateProject);
//router.delete('', projectController.deleteProject);

export = router;

