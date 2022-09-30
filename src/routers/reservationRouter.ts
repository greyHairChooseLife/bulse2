import express from 'express';
import reservationController from '../controllers/reservationController';

const router = express.Router();

router.get('', reservationController.getReservation);
router.post('', reservationController.postReservation);
router.put('', reservationController.updateReservation);
router.put('/askCheckPayment', reservationController.askCheckPayment);
router.delete('', reservationController.deleteReservation);

export = router;

