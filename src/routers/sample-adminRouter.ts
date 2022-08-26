import express from 'express';
import adminController from '../controllers/adminController';

const router = express.Router();

router.get('', adminController.getLast);
router.post('/login', adminController.login);
router.post('/register', adminController.register);
router.put('', adminController.deregister);
//router.delete('', projectController.deleteProject);

export = router;

