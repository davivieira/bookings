import { styled } from "@mui/material";

export const LoadingContainer = styled('div')(({ theme: { palette } }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: palette.background.default,
}));
