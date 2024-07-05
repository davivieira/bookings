import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Suspense } from "react";
import { getMyBookings } from "@/api/bookings/bookings";
import { Typography } from "@mui/material";
import {
  SCBookingCard,
  SCBookingInfoContainer,
  SCBookingsContainer,
  SCCancelButton,
  SCCardMedia,
  SCDivider,
  SCPropertyInfoContainer,
} from "./BookingList.styles";
import PopoverCancelConfirm from "../BookingCancelPopover/BookingCancelPopover";
import { GenericPopover, LoadingPage, MessagePage } from "@/shared";

function BookingList() {
  const currentUser = useSelector(
    (state: RootState) => state.user.currentUser
  );

  const { data } = useQuery(
    [
      "myBookings",
      {
        currentUser: currentUser ? currentUser.id : null,
      },
    ],
    getMyBookings,
    {
      enabled: !!currentUser,
    }
  );

  return (
    <Suspense fallback={<LoadingPage />}>
      <SCBookingsContainer>
        {data?.length === 0 ? <MessagePage>No bookings</MessagePage> : data?.map((booking) => (
          <SCBookingCard key={booking.id}>
            <SCCardMedia image={booking.property.picture} />
            <SCPropertyInfoContainer>
              <Typography variant="h4">{booking.property.name}</Typography>
              <Typography>{booking.property.description}</Typography>
            </SCPropertyInfoContainer>
            <SCDivider variant="middle" orientation="vertical" />
            <SCBookingInfoContainer>
              <Typography variant="h5">From</Typography>
              <Typography>{booking.checkinDate}</Typography>
              <Typography variant="h5">to</Typography>
              <Typography>{booking.checkoutDate}</Typography>
            </SCBookingInfoContainer>
            <SCDivider variant="middle" orientation="vertical" />
            <GenericPopover
              TriggerButton={({ onClick }) => (
                <SCCancelButton onClick={onClick}>Cancel</SCCancelButton>
              )}
            >
              <PopoverCancelConfirm booking={booking} />
            </GenericPopover>
          </SCBookingCard>
        ))}
      </SCBookingsContainer>
    </Suspense>
  );
}

export default BookingList;
