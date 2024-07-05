import axios from 'axios';
import { User } from '../../types';
import { useMutation } from 'react-query';
import { setCurrentUser } from '../../features/userSlice';
import { useDispatch } from 'react-redux';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

const loginUserWithEmail = async (email: string): Promise<User | null> => {
  const response = await api.post<User | null>(`/users`, { email });
  return response.data;
};


const usePostUserData = () => {
  const dispatch = useDispatch();
  return useMutation(loginUserWithEmail, {
    onSuccess: (data) => {
      if (data) {
        sessionStorage.setItem('user', JSON.stringify(data));
        dispatch(setCurrentUser(data));
      }
    },
  });
};

export default usePostUserData;
