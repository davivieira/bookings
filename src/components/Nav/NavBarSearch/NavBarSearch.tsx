import { Toolbar } from "@mui/material";
import { SCAppSearchBar, SCButton, SCNavLink, SCLogInOutText, SCTitle } from "../Nav.styles";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { SCBigScreenSearch, SCCardContainer, SCSmallScreenSearch } from "./NavBarSearch.styles";
import SearchModalGroup from "@/components/Search/SearchModal/SearchModalGroup";
import LoginModalGroup from "@/components/Login/LoginModal/LoginModalGroup";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import UserMenuPopover from "@/components/UserMenuPopover/UserMenuPopover";
import GenericPopover from "@/shared/GenericPopover/GenericPopover";

function NavBarSearch() {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  return (
    <SCAppSearchBar position="static">
      <Toolbar>
        <SCTitle variant="h6">
          <SCNavLink to="/">Bookings</SCNavLink>
        </SCTitle>

        <SCBigScreenSearch CardWrapper={SCCardContainer} />
        <SCSmallScreenSearch>
          <SearchModalGroup />
        </SCSmallScreenSearch>
        
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
    </SCAppSearchBar>
  );
}

export default NavBarSearch;
