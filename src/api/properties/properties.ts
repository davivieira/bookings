import axios from 'axios';
import { Property } from '../../types';
import { QueryFunctionContext } from 'react-query';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

type QueryParams = {
  checkinDate: string | null;
  checkoutDate: string | null;
  currentUser: string | undefined;
};

export const fetchAvailableProperties = async ({
  queryKey,
}: QueryFunctionContext<[string, QueryParams]>): Promise<Property[]> => {
  const [, { checkinDate, checkoutDate, currentUser }] = queryKey;
  const response = await api.get<Property[]>('/properties/available', {
    params: {
      checkinDate,
      checkoutDate,
      currentUser,
    },
  });
  return response.data;
};

