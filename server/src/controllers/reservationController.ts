import { Request, Response } from 'express';
import { Reservation } from '../models/Reservation.js';
import { Pricing } from '../models/Pricing.js';
import { createPreference } from '../config/mercadopago.js';
import { getGoogleCalendarBusyDates } from '../services/googleCalendarService.js';

export const getAvailability = async (req: Request, res: Response) => {
  try {
    const { month, year } = req.query;
    
    const date = new Date();
    const targetMonth = month ? parseInt(month as string) : date.getMonth();
    const targetYear = year ? parseInt(year as string) : date.getFullYear();

    const startOfMonth = new Date(targetYear, targetMonth, 1);
    const endOfMonth = new Date(targetYear, targetMonth + 1, 0);

    // 1. Obtener fechas ocupadas de MongoDB
    const reservations = await Reservation.find({
      eventDate: { $gte: startOfMonth, $lte: endOfMonth },
      status: { $ne: 'cancelled' }
    }).select('eventDate');

    const dbBusyDates = reservations.map(r => r.eventDate.toISOString().split('T')[0]);

    // 2. Obtener fechas ocupadas de Google Calendar (Sincronización automática con Gustavo)
    const googleBusyDates = await getGoogleCalendarBusyDates(startOfMonth, endOfMonth);

    // 3. Fusionar y eliminar duplicados
    const allBusyDates = [...new Set([...dbBusyDates, ...googleBusyDates])];

    res.json({ busyDates: allBusyDates });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching availability', error });
  }
};

export const createReservation = async (req: Request, res: Response) => {
  try {
    const reservationData = req.body;
    const { packageId, totalHours, peopleTier, eventDate, email } = reservationData;

    let currentPricing = await Pricing.findOne().sort({ updatedAt: -1 });

    if (!currentPricing) {
      currentPricing = new Pricing();
      await currentPricing.save();
    }

    const basePrice = (currentPricing.packages as any)[packageId] || currentPricing.packages.servicio_dj;
    const extraHours = Math.max(0, (totalHours || 5) - 5);
    const extraHoursCharge = extraHours * currentPricing.extraHourRate;
    const peopleCharge = (currentPricing.peopleTiers as any)[peopleTier] || 0;
    
    const totalRealSecure = basePrice + extraHoursCharge + peopleCharge;

    reservationData.totalPrice = totalRealSecure;
    reservationData.depositPaid = false;
    reservationData.status = 'pending';

    // Availability Check (MongoDB + Google Calendar double check)
    const dateString = new Date(eventDate).toISOString().split('T')[0];
    
    // Check DB
    const existing = await Reservation.findOne({ 
      eventDate: eventDate,
      status: { $ne: 'cancelled' }
    });

    if (existing) {
      return res.status(400).json({ message: 'La fecha seleccionada ya no está disponible en nuestro sistema' });
    }

    // Check Google Calendar (Real-time sync check)
    const startOfDay = new Date(eventDate);
    startOfDay.setHours(0,0,0,0);
    const endOfDay = new Date(eventDate);
    endOfDay.setHours(23,59,59,999);
    
    const googleEvents = await getGoogleCalendarBusyDates(startOfDay, endOfDay);
    if (googleEvents.length > 0) {
      return res.status(400).json({ message: 'Gustavo ya tiene un compromiso personal en esta fecha' });
    }

    const newReservation = new Reservation(reservationData);
    await newReservation.save();

    const mpPreference = await createPreference(
      (newReservation._id as any).toString(),
      currentPricing.depositAmount,
      email
    );

    newReservation.mercadoPagoPreferenceId = mpPreference.id;
    await newReservation.save();

    res.status(201).json({ 
      message: 'Reservación creada. Redirigiendo a pago.', 
      reservation: newReservation,
      init_point: mpPreference.init_point 
    });

  } catch (error) {
    console.error('Reservation Error:', error);
    res.status(500).json({ message: 'Error al procesar la reservación', error });
  }
};
