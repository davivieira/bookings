import { Box, ClickAwayListener } from "@mui/material";
import { SCModal } from "./GenericModal.styles";

type GenericModalProps = {
  children: React.ReactElement;
  open: boolean;
  handleClose: () => void;
};

function GenericModal({ open, handleClose, children }: GenericModalProps) {
  return (
    <SCModal open={open} onClose={handleClose}>
      <Box>
        <ClickAwayListener onClickAway={handleClose}>
          <Box className="modal-content">{children}</Box>
        </ClickAwayListener>
      </Box>
    </SCModal>
  );
}

export default GenericModal;
