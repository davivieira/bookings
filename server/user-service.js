import { Router } from 'express';
import db from './db.js';

const router = Router();

router.post('/', async (req, res) => {
  const userEmail = req.body.email;
  const user = db.users.find(user => user.email === userEmail);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

export default router;
