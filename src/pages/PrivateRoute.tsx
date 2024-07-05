import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../store';

const PrivateRoute = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  return currentUser ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
