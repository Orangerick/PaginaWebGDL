import { Request, Response } from 'express';
import { Reservation } from '../models/Reservation.js';
import { Pricing } from '../models/Pricing.js';
import { createPreference } from '../config/mercadopago.js';

export const getAvailability = async (req: Request, res: Response) => {
  try {
    const { month, year } = req.query;
    
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
    const { packageId, totalHours, peopleTier, eventDate, email } = reservationData;

    // 1. Fetch dynamic pricing from MongoDB
    let currentPricing = await Pricing.findOne().sort({ updatedAt: -1 });

    if (!currentPricing) {
      currentPricing = new Pricing();
      await currentPricing.save();
    }

    // 2. Security Recalculation: "Total Real y Seguro"
    const basePrice = (currentPricing.packages as any)[packageId] || currentPricing.packages.servicio_dj;
    const extraHours = Math.max(0, (totalHours || 5) - 5);
    const extraHoursCharge = extraHours * currentPricing.extraHourRate;
    const peopleCharge = (currentPricing.peopleTiers as any)[peopleTier] || 0;
    
    const totalRealSecure = basePrice + extraHoursCharge + peopleCharge;

    // 3. Inject verified price and set initial status
    reservationData.totalPrice = totalRealSecure;
    reservationData.depositPaid = false;
    reservationData.status = 'pending';

    // 4. Availability Check
    const existing = await Reservation.findOne({ 
      eventDate: eventDate,
      status: { $ne: 'cancelled' }
    });

    if (existing) {
      return res.status(400).json({ message: 'La fecha seleccionada ya no está disponible' });
    }

    // 5. Save the initial reservation record
    const newReservation = new Reservation(reservationData);
    await newReservation.save();

    // 6. Generate Mercado Pago Preference for the deposit
    // Corrected TypeScript conversion for MongoDB _id
    const mpPreference = await createPreference(
      (newReservation._id as any).toString(),
      currentPricing.depositAmount,
      email
    );

    // Save Preference ID in the reservation
    newReservation.mercadoPagoPreferenceId = mpPreference.id;
    await newReservation.save();

    res.status(201).json({ 
      message: 'Reservación creada. Redirigiendo a pago.', 
      reservation: newReservation,
      init_point: mpPreference.init_point // URL de Mercado Pago
    });

  } catch (error) {
    console.error('Reservation Error:', error);
    res.status(500).json({ message: 'Error al procesar la reservación', error });
  }
};
