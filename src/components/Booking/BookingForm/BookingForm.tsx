import { useFormik } from "formik";
import * as Yup from "yup";
import { SCErrorMessage, SCForm } from "@/styles";
import { SCBookingFormContainer, SCDatePickerGroup, SCFormFooter } from "./BookingForm.styles";
import { Button, CircularProgress, FormControl, FormLabel } from "@mui/material";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useSearchParams } from "../../../utils";
import { usePostBookingData } from "../../../api/bookings/bookings";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  checkinDate: Yup.date().required(),
  checkoutDate: Yup.date().required(),
});

type LoginFormProps = {
  handleClose: () => void;
  propertyId: string;
};

function BookingForm({ handleClose, propertyId }: LoginFormProps) {
  const navigate = useNavigate();
  const params = useSearchParams();
  const checkinDate = params.get('checkinDate');
  const checkoutDate = params.get('checkoutDate');
  const { mutate, isError, error, isLoading } = usePostBookingData();
  const currentUser = useSelector((state: RootState) => state.user.currentUser?.id);
  
  const {
    handleSubmit,
    values,
    isValid,
    setFieldValue,
  } = useFormik({
    validateOnMount: true,
    initialValues: {
      checkinDate: checkinDate ? dayjs(checkinDate) : null,
      checkoutDate: checkoutDate ? dayjs(checkoutDate) : null,
    },
    validationSchema,
    onSubmit: (values) => {
      const formattedValues = {
        checkinDate: values.checkinDate ? dayjs(values.checkinDate).format('MM-DD-YYYY') : '',
        checkoutDate: values.checkoutDate ? dayjs(values.checkoutDate).format('MM-DD-YYYY') : '',
      };

      mutate({
        ...formattedValues,
        userId: currentUser!,
        propertyId
      }, {
        onSuccess: () => {
          handleClose();
          navigate('/bookings');
        }
      });
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <SCBookingFormContainer>
        <SCForm onSubmit={handleSubmit}>
          {!currentUser && (
            <SCErrorMessage>You must be logged in to make a booking</SCErrorMessage>
          )}
          {isError && (
            <SCErrorMessage>{error?.response.data.message}</SCErrorMessage>
          )}
          <SCDatePickerGroup>
            <FormControl component="fieldset" margin="normal">
              <FormLabel htmlFor="checkinDate" component="legend">From</FormLabel>
              <StaticDatePicker
                value={values.checkinDate}
                disablePast
                onChange={(value) => setFieldValue("checkinDate", value)}
                slotProps={{
                  actionBar: {
                    actions: []
                  },
                }}
                shouldDisableDate={(date) =>
                  values.checkoutDate
                    ? date > (values.checkoutDate as Dayjs)
                    : false
                }
              />
            </FormControl>

            <FormControl component="fieldset" margin="normal">
              <FormLabel component="legend">To</FormLabel>
              <StaticDatePicker
                value={values.checkoutDate}
                disablePast
                onChange={(value) => setFieldValue("checkoutDate", value)}
                slotProps={{
                  actionBar: {
                    actions: []
                  },
                }}
                shouldDisableDate={(date) =>
                  values.checkinDate
                    ? date < (values.checkinDate as Dayjs)
                    : false
                }
              />
            </FormControl>
          </SCDatePickerGroup>
          <SCFormFooter>
            <Button variant="contained" type="submit" disabled={!isValid || !currentUser || isLoading}>Confirm</Button>
            {isLoading && <CircularProgress />}
            <Button color="secondary" variant="outlined" onClick={handleClose}>Cancel</Button>
          </SCFormFooter>
          
        </SCForm>
      </SCBookingFormContainer>
    </LocalizationProvider>
  );
}

export default BookingForm;
