import { Router } from 'express';
import { Pricing } from '../models/Pricing.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

// Public route to get current prices
router.get('/', async (req, res) => {
  try {
    let pricing = await Pricing.findOne().sort({ updatedAt: -1 });
    if (!pricing) {
      pricing = new Pricing();
      await pricing.save();
    }
    res.json(pricing);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pricing', error });
  }
});

// Protected route to update prices (Admin only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const newPricing = new Pricing({
      ...req.body,
      updatedAt: new Date()
    });
    await newPricing.save();
    res.json({ message: 'Pricing updated successfully', pricing: newPricing });
  } catch (error) {
    res.status(500).json({ message: 'Error updating pricing', error });
  }
});

export default router;
