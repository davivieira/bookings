import { Router } from 'express';
import dayjs from 'dayjs';
import db from './db.js';

const router = Router();

router.get('/', async (req, res) => {
  res.status(200).json(db.properties);
});

router.get('/available', async (req, res) => {
  const { checkinDate, checkoutDate, currentUser } = req.query;

  const checkin = checkinDate ? dayjs(checkinDate) : null;
  const checkout = checkoutDate ? dayjs(checkoutDate) : null;

  const availableProperties = db.properties.filter(property => {
    if (currentUser && property.userId === currentUser) {
      return false;
    }

    if (!checkin || !checkout) {
      return true;
    }

    const hasOverlap = property.bookings.some(bookingId => {
      const booking = db.bookings.find(b => b.id === bookingId);
      if (!booking) return false;

      const bookingStart = dayjs(booking.checkinDate);
      const bookingEnd = dayjs(booking.checkoutDate);

      return (
        (checkin.isBefore(bookingEnd) && checkout.isAfter(bookingStart)) ||
        (checkin.isSame(bookingStart, 'day') || checkout.isSame(bookingEnd, 'day'))
      );
    });

    return !hasOverlap;
  });

  res.status(200).json(availableProperties);
});

export default router;
