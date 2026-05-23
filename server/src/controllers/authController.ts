import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'password123';
const JWT_SECRET = process.env.JWT_SECRET || 'gdl_dj_secret_key_2024';

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (username === ADMIN_USER && password === ADMIN_PASSWORD) {
      const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
      return res.json({ token });
    }

    res.status(401).json({ message: 'Credenciales inválidas' });
  } catch (error) {
    res.status(500).json({ message: 'Error en el login', error });
  }
};
