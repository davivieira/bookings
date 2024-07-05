import { useNavigate } from 'react-router-dom'
import { SCPopoverContainer, SCPopoverOption } from './UserMenuPopover.styles'
import { useDispatch } from 'react-redux';
import { resetUser } from '@/features/userSlice';

function UserMenuPopover() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate = () => {
    navigate('/bookings');
  }

  const handleLogout = () => {
    dispatch(resetUser())
    sessionStorage.removeItem('user');
    navigate('/');
  }

  return (
    <SCPopoverContainer>
      <SCPopoverOption onClick={handleNavigate}>My Bookings</SCPopoverOption>
      <SCPopoverOption onClick={handleLogout}>Logout</SCPopoverOption>
    </SCPopoverContainer>
  )
}

export default UserMenuPopover