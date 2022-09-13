import express from 'express';
import reservationController from '../controllers/reservationController';

const router = express.Router();

router.get('', reservationController.getReservation);
router.post('', reservationController.postReservation);
//router.put('', reservationController.updateReservation);
router.delete('', reservationController.deleteReservation);

export = router;

