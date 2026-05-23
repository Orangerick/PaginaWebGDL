import { Router } from 'express';
import { getAvailability, createReservation } from '../controllers/reservationController.js';

const router = Router();

router.get('/availability', getAvailability);
router.post('/', createReservation);

export default router;
