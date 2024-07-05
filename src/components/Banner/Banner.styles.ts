import { Box, styled, Typography } from "@mui/material";

export const SCBannerContainer = styled(Box)(({ theme: { breakpoints, palette } }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  justifyContent: 'center',
  minHeight: 400,
  width: '100%',
  background: `linear-gradient(to right, ${palette.primary.main}, ${palette.secondary.main})`,
  [breakpoints.down('lg')]: {
    left: 0,
    right: 0,
    width: '100vw'
  }
}))

export const SCSlogan = styled(Typography)(() => ({
  color: 'white',
  fontSize: 60,
  fontWeight: 700
}))