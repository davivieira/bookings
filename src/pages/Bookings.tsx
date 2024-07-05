import { BookingList } from "@/components/Booking/";
import NavBar from "@/components/Nav/NavBar/NavBar";
import { SCResultsContainer } from "@/styles";

function Bookings() {
  return (
    <>
      <NavBar />
      <SCResultsContainer>
        <BookingList />
      </SCResultsContainer>
    </>
  );
}

export default Bookings;
