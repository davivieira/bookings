import { Card, CardActions, styled, Typography } from "@mui/material";

export const SCCardFooter = styled(CardActions)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  bottom: 0
}))

export const SCCard = styled(Card)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  width: '100%',
  maxWidth: 345
})) 

export const SCPrice = styled(Typography)(({ theme: { palette } }) => ({
  fontWeight: 'bold',
  color: palette.secondary.main
}));