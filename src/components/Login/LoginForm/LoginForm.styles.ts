import { Box, Button, styled } from "@mui/material";

export const SCContainer = styled(Box)(({ theme: { palette } }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: palette.background.default,
  padding: 20,
  gap: 20,
  borderRadius: 10
}))

export const SCLoginButton = styled(Button)(({ theme: { palette } }) => ({
  width: '100%',
  height: 50,
  color: palette.background.default,
  backgroundColor: palette.secondary.main,
  '&:hover': {
    backgroundColor: palette.background.default,
    color: palette.secondary.main
  }
}))