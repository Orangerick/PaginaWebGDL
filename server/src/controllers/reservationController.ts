import { Request, Response } from 'express';
import { Reservation } from '../models/Reservation.js';

export const getAvailability = async (req: Request, res: Response) => {
  try {
    const { month, year } = req.query;
    
    // Default to current month/year if not provided
    const date = new Date();
    const targetMonth = month ? parseInt(month as string) : date.getMonth();
    const targetYear = year ? parseInt(year as string) : date.getFullYear();

    const startOfMonth = new Date(targetYear, targetMonth, 1);
    const endOfMonth = new Date(targetYear, targetMonth + 1, 0);

    const reservations = await Reservation.find({
      eventDate: { $gte: startOfMonth, $lte: endOfMonth },
      status: { $ne: 'cancelled' }
    }).select('eventDate');

    const busyDates = reservations.map(r => r.eventDate.toISOString().split('T')[0]);

    res.json({ busyDates });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching availability', error });
  }
};

export const createReservation = async (req: Request, res: Response) => {
  try {
    const reservationData = req.body;
    
    // Check if date is already busy
    const existing = await Reservation.findOne({ 
      eventDate: reservationData.eventDate,
      status: { $ne: 'cancelled' }
    });

    if (existing) {
      return res.status(400).json({ message: 'Date is already booked' });
    }

    const newReservation = new Reservation(reservationData);
    await newReservation.save();

    res.status(201).json({ message: 'Reservation created successfully', reservation: newReservation });
  } catch (error) {
    res.status(500).json({ message: 'Error creating reservation', error });
  }
};
