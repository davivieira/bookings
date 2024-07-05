import { Box, styled } from "@mui/material";

export const SCBookingFormContainer = styled(Box)(({ theme: { palette } }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: palette.background.default,
  padding: 20,
  gap: 20,
  borderRadius: 10
}));

export const SCDatePickerGroup = styled(Box)(({ theme: { breakpoints } }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  gap: 10,
  [breakpoints.down('md')]: {
    flexDirection: 'column'
  }
}))

export const SCFormFooter = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  gap: 10,
  width: '100%'
}))
