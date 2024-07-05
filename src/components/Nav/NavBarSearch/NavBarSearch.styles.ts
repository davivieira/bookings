import { Box, styled } from "@mui/material";
import SearchForm from "../../Search/SearchForm/SearchForm";

export const SCBigScreenSearch = styled(SearchForm)(({ theme: { breakpoints } }) => ({
  [breakpoints.down('xl')]: {
    display: 'none'
  }
}))

export const SCSmallScreenSearch = styled(Box)(({ theme: { breakpoints } }) => ({
  marginRight: 30,
  [breakpoints.up('lg')]: {
    display: 'none'
  }
}))

export const SCCardContainer = styled(Box)(({ theme: { breakpoints, palette } }) => ({
  display: 'flex',
  background: palette.background.default,
  padding: 8,
  gap: 5,
  borderRadius: 10,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
  width: '70%',
  [breakpoints.down('lg')]: {
    display: 'none'
  },
  '& button.MuiButton-root': {
    backgroundColor: palette.secondary.main,
    color: palette.background.default,
    borderRadius: 100,
    minHeight: 50,
    minWidth: 150,
    maxHeight: 50,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    '&:hover': {
      backgroundColor: palette.background.default,
      color: palette.secondary.main,
      border: `1px solid inherit`
    }
  }
}))