import { Button, styled, Typography } from "@mui/material"

export const SButton = styled(Button)(({ theme: { breakpoints } }) => ({
  justifyContent: 'flex-end',
  whiteSpace: 'nowrap',
  [breakpoints.up('sm')]: {
    display: 'flex',
    flexDirection: 'row',
    color: 'inherit',
    width: 100
  }
}))

export const SLogInOutText = styled(Typography)(({ theme: { breakpoints } }) => ({
  paddingInline: 5,
  [breakpoints.down('sm')]: {
    display: 'none'
  }
}))