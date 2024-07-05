import { Toolbar } from "@mui/material";
import {
  SCAppBar,
  SCButton,
  SCLogInOutText,
  SCNavLink,
  SCTitle,
} from "../Nav.styles";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import LoginModalGroup from "@/components/Login/LoginModal/LoginModalGroup";
import UserMenuPopover from "@/components/UserMenuPopover/UserMenuPopover";
import GenericPopover from "@/shared/GenericPopover/GenericPopover";

function NavBar() {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === "/") {
      event.preventDefault();
      window.location.reload();
    }
  };

  return (
    <SCAppBar position="static">
      <Toolbar>
        <SCTitle variant="h6">
          <SCNavLink to="/" onClick={handleClick}>
            Bookings
          </SCNavLink>
        </SCTitle>
        {currentUser ? (
          <GenericPopover
            TriggerButton={({ onClick }) => (
              <SCButton onClick={onClick} color="inherit">
                <SCLogInOutText>{currentUser.name}</SCLogInOutText>
                <AccountBoxIcon />
              </SCButton>
            )}
          >
            <UserMenuPopover />
          </GenericPopover>
        ) : (
          <LoginModalGroup />
        )}
      </Toolbar>
    </SCAppBar>
  );
}

export default NavBar;
