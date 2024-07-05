import { useQueryClient } from "react-query";
import { useDeleteBookingData } from "../../../api";
import { BookingResponse } from "../../../types";
import {
  SCPopoverActions,
  SCPopoverContainer,
  SCPopoverOption,
} from "./BookingCancelPopover.styles";
import { Typography } from "@mui/material";

type PopoverCancelConfirmProps = {
  handleClose?: () => void;
  booking: BookingResponse;
};

function BookingCancelPopover({ handleClose, booking }: PopoverCancelConfirmProps) {
  const { mutate } = useDeleteBookingData();
  const queryClient = useQueryClient();

  const handleCancelling = () => {
    mutate({ bookingId: booking.id }, {
      onSuccess: () => {
        queryClient.invalidateQueries(['myBookings']);
        handleClose!();
      }
    });
  }

  return (
    <SCPopoverContainer>
      <Typography variant="h6">Are you sure you want to cancel?</Typography>
      <SCPopoverActions>
        <SCPopoverOption color="error" variant="contained" onClick={handleCancelling}>
          Yes, cancel it
        </SCPopoverOption>
        <SCPopoverOption onClick={handleClose}>No</SCPopoverOption>
      </SCPopoverActions>
    </SCPopoverContainer>
  );
}

export default BookingCancelPopover;
