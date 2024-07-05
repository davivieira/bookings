import { Box, styled, Typography } from "@mui/material";

export const SCForm = styled('form')(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 10
}))

export const SCErrorMessage = styled('div')(({ theme: { palette } }) => ({
  color: palette.background.default,
  backgroundColor: palette.error.main,
  fontSize: '0.875rem',
  padding: 10,
  borderRadius: 5
}))


export const SCHomeContainer = styled(Box)(({ theme: { breakpoints } }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 200,
  padding: 100,
  [breakpoints.down('md')]: {
    padding: 50,
    gap: 80
  }
}))

export const SCMessagePageContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: 20
}))

export const SCMessage = styled(Typography)(({ theme: { palette } }) => ({
  color: palette.secondary.main
}))

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

export const SCCardContainer = styled(Box)(({ theme: { breakpoints, palette } }) => ({
  display: 'flex',
  backgroundColor: palette.background.default,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
  width: '80%',
  [breakpoints.down('lg')]: {
    width: '100%',
    flexDirection: 'column',
    gap: 20
  },
  border: `1px solid ${palette.secondary.main}`,
  borderRadius: 10,
  boxShadow: `0 2px 6px 0 ${palette.primary.main}, 0 4px 12px 0 ${palette.secondary.main}`,
  padding: 30,
  '& button.MuiButton-root': {
    backgroundColor: palette.secondary.main,
    color: palette.background.default,
    borderRadius: 100,
    minHeight: 50,
    minWidth: 150,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    '&:hover': {
      backgroundColor: palette.background.default,
      color: palette.secondary.main,
      border: `1px solid inherit`
    },
  },
  '& button.Mui-disabled': {
    background: palette.grey[500],
  }
}))