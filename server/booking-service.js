import { Router } from 'express';
import { Mutex } from 'async-mutex';
import { nanoid } from 'nanoid';
import dayjs from 'dayjs';
import db from './db.js';

const router = Router();
const bookingMutex = new Mutex();

router.post('/', async (req, res) => {
  const { userId, propertyId, checkinDate, checkoutDate } = req.body;
  const release = await bookingMutex.acquire();
  
  try {
    if (dayjs(checkinDate).isAfter(dayjs(checkoutDate)) || dayjs(checkinDate).isSame(dayjs(checkoutDate))) {
      throw new Error('Invalid date interval: checkinDate must be before checkoutDate');
    }

    const isBooked = db.bookings.some(
      (booking) => booking.propertyId === propertyId && (
        (dayjs(checkinDate).isBefore(dayjs(booking.checkoutDate)) && dayjs(checkoutDate).isAfter(dayjs(booking.checkinDate))) ||
        (dayjs(checkinDate).isSame(dayjs(booking.checkinDate)) || dayjs(checkoutDate).isSame(dayjs(booking.checkoutDate)))
      )
    );

    if (isBooked) {
      throw new Error('Property is already booked for this date');
    }

    const newBooking = {
      id: nanoid(),
      userId,
      propertyId,
      checkinDate,
      checkoutDate
    };

    db.bookings.push(newBooking);

    const property = db.properties.find((prop) => prop.id === propertyId);
    if (property) {
      property.bookings.push(newBooking.id);
    } else {
      throw new Error('Property not found');
    }

    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  } finally {
    release();
  }
});

router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;
  const bookings = db.bookings.filter(booking => booking.userId === userId);
  const result = bookings.map(booking => {
    const property = db.properties.find(property => property.id === booking.propertyId);
    return {
      ...booking,
      property
    }
  })
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).json({ error: 'You have no bookings' });
  }
});

router.delete('/:bookingId', async (req, res) => {
  const { bookingId } = req.params;
  const release = await bookingMutex.acquire();

  try {
    const bookingIndex = db.bookings.findIndex((booking) => booking.id === bookingId);
    if (bookingIndex === -1) {
      throw new Error('Booking not found');
    }

    const booking = db.bookings[bookingIndex];

    db.bookings.splice(bookingIndex, 1);

    const property = db.properties.find((prop) => prop.id === booking.propertyId);
    if (property) {
      const bookingIdIndex = property.bookings.indexOf(bookingId);
      if (bookingIdIndex !== -1) {
        property.bookings.splice(bookingIdIndex, 1);
      }
    }

    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  } finally {
    release();
  }
});


export default router;
