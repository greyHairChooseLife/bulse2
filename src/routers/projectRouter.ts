import express from 'express';
import projectController from '../controllers/projectController';

const router = express.Router();

router.get('', projectController.getProjectByDate);
router.post('', projectController.postProject);
//router.put('', projectController.updateProject);
//router.delete('', projectController.deleteProject);

export = router;

