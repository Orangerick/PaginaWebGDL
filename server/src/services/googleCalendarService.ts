import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

// Configuración de la Service Account
// El usuario debe poner el contenido del JSON en GOOGLE_SERVICE_ACCOUNT_JSON en el .env
const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON || '{}'),
  scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
});

const calendar = google.calendar({ version: 'v3', auth });

export const getGoogleCalendarBusyDates = async (startOfMonth: Date, endOfMonth: Date) => {
  try {
    const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';
    
    const response = await calendar.events.list({
      calendarId,
      timeMin: startOfMonth.toISOString(),
      timeMax: endOfMonth.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = response.data.items || [];
    
    // Extraer solo las fechas (YYYY-MM-DD)
    const busyDates = events.map(event => {
      const start = event.start?.dateTime || event.start?.date;
      return start ? start.split('T')[0] : null;
    }).filter(date => date !== null) as string[];

    // Eliminar duplicados
    return [...new Set(busyDates)];
  } catch (error) {
    console.error('Error fetching Google Calendar events:', error);
    return []; // Si falla, devolvemos vacío para no romper la web
  }
};
