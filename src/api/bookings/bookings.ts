import axios from 'axios';
import { BookingResponse } from '@/types';
import { QueryFunctionContext, useMutation, UseMutationResult } from 'react-query';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

type CreateBookingParams = {
  userId: string;
  propertyId: string;
  checkinDate: string;
  checkoutDate: string;
}

type ErrorResponse = {
  response: {
    data: {
      message: string
    }
  };
}

export type QueryParams = {
  currentUser: string | null;
};

export type DeleteQueryParams = {
  bookingId: string | null;
};

export const getMyBookings = async ({ queryKey }: QueryFunctionContext<[string, QueryParams]>): Promise<BookingResponse[]> => {
  const [, { currentUser }] = queryKey;
  const response = await api.get<BookingResponse[]>(`/bookings/${currentUser}`);
  return response.data;
};

const cancelBooking = async ({ bookingId }: DeleteQueryParams): Promise<BookingResponse[]> => {
  const response = await api.delete<BookingResponse[]>(`/bookings/${bookingId}`);
  return response.data;
};


const createBooking = async ({ userId, propertyId, checkinDate, checkoutDate }: CreateBookingParams): Promise<BookingResponse | null> => {
  const response = await api.post<BookingResponse | null>(`/bookings`, {
    userId,
    propertyId,
    checkinDate,
    checkoutDate
  });
  return response.data;
};

export const usePostBookingData = (): UseMutationResult<BookingResponse | null, ErrorResponse, CreateBookingParams, unknown> => {
  return useMutation(createBooking);
};

export const useDeleteBookingData = () => {
  return useMutation(cancelBooking);
};
