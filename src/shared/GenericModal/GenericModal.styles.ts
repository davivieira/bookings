import { Modal, styled } from "@mui/material";

export const SCModal = styled(Modal)(({ theme: { palette } }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& .modal-content': {
    backgroundColor: palette.background.default,
    outline: 'none',
  },
}))