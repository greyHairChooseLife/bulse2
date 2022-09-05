import express from 'express';
import reservationController from '../controllers/reservationController';

const router = express.Router();

//router.get('', reservationController.getReservationByDate);
router.post('', reservationController.postReservation);
//router.put('/likeCount', reservationController.updateLikeCount);
//router.put('', reservationController.updateReservation);
//router.delete('', reservationController.deleteReservation);

export = router;

