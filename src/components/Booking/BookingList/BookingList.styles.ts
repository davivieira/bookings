import { Box, Button, Card, CardMedia, Divider, styled } from "@mui/material";

export const SCBookingsContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 10,
  marginBottom: 50
}))

export const SCBookingCard = styled(Card)(({ theme: { breakpoints } }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  width: 'fit-content',
  height: 'fit-content',
  minHeight: 155,
  gap: 2,
  [breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'center',
  }
}))

export const SCCardMedia = styled(CardMedia)(({ theme: { breakpoints } }) => ({ 
  width: 100,
  height: '100%',
  [breakpoints.down('md')]: {
    width: '100%',
    height: 200
  }
}))

export const SCPropertyInfoContainer = styled(Box)(() => ({
  padding: 10,
  maxWidth: 350
}))

export const SCBookingInfoContainer = styled(Box)(({ theme: { breakpoints } }) => ({
  padding: 10,
  maxWidth: 350,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: 2,
  [breakpoints.down('md')]: {
    flexDirection: 'row',
    gap: 10
  }
}))

export const SCCardActionsContainer = styled(Box)(() => ({
  padding: 10,
  maxWidth: 350
}))

export const SCCancelButton = styled(Button)(({ theme: { palette, breakpoints } }) => ({
  height: '100%',
  color: palette.error.main,
  '&:hover': {
    background: palette.error.dark,
    color: palette.background.default
  },
  [breakpoints.down('md')]: {
    width: '100%',
    height: 50
  }
}))

export const SCDivider = styled(Divider)(({ theme: { breakpoints } }) => ({
  [breakpoints.down('md')]: {
    display: 'none'
  }
}))