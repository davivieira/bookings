import { Box, Button, styled } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export const SDateRangeInputGroup = styled(Box)(({ theme: { breakpoints } }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  gap: 10,
  [breakpoints.down('md')]: {
    flexDirection: 'column'
  }
}))

export const SDatePicker = styled(DatePicker)(({ theme : { breakpoints, palette }}) => ({
  width: 240,
  background: palette.background.default,
  [breakpoints.down('sm')]: {
    paddingTop: 5,
    paddingBottom: 5
  },
  [breakpoints.down('md')]: {
    paddingTop: 5,
    paddingBottom: 5
  }
}))

export const SCSearchButton = styled(Button)(({ theme: { palette } }) => ({
  '& .Mui-disabled': {
    background: palette.grey[100],
  }
}))