import { Box, Button, styled } from "@mui/material";

export const SCPopoverContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  padding: 20,
  paddingBottom: 10
}))

export const SCPopoverOption = styled(Button)(() => ({
  width: '100%'
}))

export const SCPopoverActions = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  gap: 10,
  justifyContent: 'space-between'
}))