import express from 'express';
import cors from 'cors';
import userRouter from './user-service.js';
import propertyRouter from './property-service.js';
import bookingRouter from './booking-service.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/users', userRouter);
app.use('/properties', propertyRouter);
app.use('/bookings', bookingRouter);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
