import { Box, styled } from "@mui/material";

export const SCResultsContainer = styled(Box)(({ theme: { breakpoints } }) => ({
  display: 'grid',
  gap: 20,
  padding: 40,
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  [breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  },
  [breakpoints.down('sm')]: {
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  },
}))