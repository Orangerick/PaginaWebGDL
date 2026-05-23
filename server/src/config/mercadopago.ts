import { MercadoPagoConfig, Preference } from 'mercadopago';
import dotenv from 'dotenv';

dotenv.config();

const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN || 'TEST-4161746244439054-052301-447551065751270505-1234567' // Placeholder token de prueba
});

export const createPreference = async (reservationId: string, amount: number, customerEmail: string) => {
  const preference = new Preference(client);

  const body = {
    items: [
      {
        id: reservationId,
        title: 'Anticipo Reservación GDL.DJ',
        quantity: 1,
        unit_price: amount,
        currency_id: 'MXN'
      }
    ],
    payer: {
      email: customerEmail
    },
    back_urls: {
      success: `${process.env.FRONTEND_URL || 'http://localhost:5174'}/payment-success`,
      failure: `${process.env.FRONTEND_URL || 'http://localhost:5174'}/payment-failed`,
      pending: `${process.env.FRONTEND_URL || 'http://localhost:5174'}/payment-pending`
    },
    auto_return: 'approved',
    notification_url: `${process.env.BACKEND_URL}/api/payments/webhook`, // Endpoint para confirmar el pago
    external_reference: reservationId
  };

  try {
    const response = await preference.create({ body });
    return {
      id: response.id,
      init_point: response.init_point
    };
  } catch (error) {
    console.error('Error creating MP preference:', error);
    throw error;
  }
};
