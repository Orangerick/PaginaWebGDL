import { Request, Response } from 'express';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { Reservation } from '../models/Reservation.js';
import dotenv from 'dotenv';

dotenv.config();

const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN || 'TEST-4161746244439054-052301-447551065751270505-1234567' 
});

export const handleWebhook = async (req: Request, res: Response) => {
  const { query } = req;
  const topic = query.topic || query.type;

  try {
    if (topic === 'payment') {
      const paymentId = (query.id || query['data.id']) as string;
      const payment = new Payment(client);
      const paymentData = await payment.get({ id: paymentId });

      if (paymentData.status === 'approved') {
        // The external_reference contains our Reservation ID
        const reservationId = paymentData.external_reference;

        if (reservationId) {
          await Reservation.findByIdAndUpdate(reservationId, {
            depositPaid: true,
            status: 'confirmed'
          });
          console.log(`Reservation ${reservationId} confirmed via MP Webhook`);
        }
      }
    }

    res.sendStatus(200);
  } catch (error) {
    console.error('Webhook Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
