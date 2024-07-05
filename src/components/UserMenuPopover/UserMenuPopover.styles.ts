import { Box, Button, styled } from "@mui/material";

export const SCPopoverContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  paddingTop: 10,
  paddingBottom: 10
}))

export const SCPopoverOption = styled(Button)(() => ({
  width: '100%'
}))