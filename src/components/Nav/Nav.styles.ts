import { AppBar, Button, styled, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

export const SCTitle = styled(Typography)(() => ({
  flexGrow: 1,
}));

export const SCAppBar = styled(AppBar)(({ theme: { palette, breakpoints } }) => ({
  background: `linear-gradient(to right, ${palette.primary.main}, ${palette.secondary.main})`,
  zIndex: 1000,
  height: 80,
  padding: 8,
  [breakpoints.down('sm')]: {
    top: 'auto',
    bottom: 0,
    left: 0,
    right: 0,
    position: 'fixed',
    width: '100vw'
  }
}));

export const SCAppSearchBar = styled(AppBar)(({ theme: { palette, breakpoints } }) => ({
  background: `linear-gradient(to right, ${palette.primary.main}, ${palette.secondary.main})`,
  zIndex: 1000,
  height: 80,
  padding: 8,
  [breakpoints.down('sm')]: {
    top: 'auto',
    bottom: 0,
    left: 0,
    right: 0,
    position: 'fixed',
    width: '100vw'
  }
}));

export const SCButton = styled(Button)(({ theme: { breakpoints } }) => ({
  justifyContent: 'flex-end',
  whiteSpace: 'nowrap',
  [breakpoints.up('sm')]: {
    display: 'flex',
    flexDirection: 'row',
    color: 'inherit',
    width: 100
  }
}))

export const SCLogInOutText = styled(Typography)(({ theme: { breakpoints } }) => ({
  paddingInline: 5,
  [breakpoints.down('sm')]: {
    display: 'none'
  }
}))

export const SCNavLink = styled(NavLink)(() => ({
  textDecoration: 'none', 
  color: 'inherit'
}))