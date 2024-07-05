import { Button } from "@mui/material";
import GenericModal from "../../../shared/GenericModal/GenericModal";
import BookingForm from "../BookingForm/BookingForm";
import { useState } from "react";

function LoginModalGroup({ propertyId }: { propertyId: string }) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
      <Button color="primary" onClick={() => setOpen(true)}>
        Book
      </Button>
      <GenericModal open={open} handleClose={handleClose}>
        <BookingForm propertyId={propertyId} handleClose={handleClose}/>
      </GenericModal>
    </>
  )
}

export default LoginModalGroup