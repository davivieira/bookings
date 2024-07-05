import { useFormik } from 'formik';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SCSearchButton, SDatePicker, SDateRangeInputGroup } from './SearchForm.styles';
import dayjs, { Dayjs } from 'dayjs';
import { useSearchParams } from '@/utils';
import { useNavigate } from 'react-router-dom';
import { SCErrorMessage, SCForm } from '@/styles';
import { useMemo } from 'react';
import { searchValidationSchema } from './utils/searchValidationSchema';

type CardWrapperProps = {
  children: React.ReactNode
}

type SearchFormProps = {
  CardWrapper: React.FC<CardWrapperProps>;
  handleClose?: () => void
}

function SearchForm({ CardWrapper, handleClose }: SearchFormProps) {
  const navigate = useNavigate();
  const params = useSearchParams();
  const checkinDate = useMemo(() => params.get('checkinDate'), [params]);
  const checkoutDate = useMemo(() => params.get('checkoutDate'), [params]);

  const {
    values,
    setFieldValue,
    handleSubmit,
    touched,
    errors,
    isValid
  } = useFormik({
    initialValues: {
      checkinDate: checkinDate ? dayjs(checkinDate) : null,
      checkoutDate: checkoutDate ? dayjs(checkoutDate) : null,
    },
    validationSchema: searchValidationSchema,
    onSubmit: (values) => {
      const formattedValues = {
        checkinDate: values.checkinDate ? dayjs(values.checkinDate).format('MM-DD-YYYY') : '',
        checkoutDate: values.checkoutDate ? dayjs(values.checkoutDate).format('MM-DD-YYYY'): '',
      };

      if (handleClose) {
        handleClose();
      }
      
      if (formattedValues.checkinDate && formattedValues.checkoutDate) {
        navigate(`/results?${new URLSearchParams(formattedValues).toString()}`);
        return;
      }

      navigate('/results');
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <SCForm onSubmit={handleSubmit}>
        <CardWrapper>
          <SDateRangeInputGroup>
            <SDatePicker
              label="Check-in Date"
              disablePast
              value={values.checkinDate}
              onChange={(value) => setFieldValue("checkinDate", value)}
              shouldDisableDate={(date) =>
                values.checkoutDate ? date > (values.checkoutDate as Dayjs) : false
              }
            />
            <SDatePicker
              label="Check-out Date"
              disablePast
              value={values.checkoutDate}
              onChange={(value) => setFieldValue("checkoutDate", value)}
              shouldDisableDate={(date) =>
                values.checkinDate ? date < (values.checkinDate as Dayjs) : false
              }
            />
          </SDateRangeInputGroup>
          {errors.checkinDate && touched.checkinDate && (
            <SCErrorMessage>In case you want a specific date range, both date fields must be filled.</SCErrorMessage>
          )}
          <SCSearchButton type="submit" disabled={!isValid} >
            {values.checkinDate || values.checkoutDate ? 'Find Properties' : 'All Properties'}
          </SCSearchButton>
        </CardWrapper>
        
      </SCForm>
    </LocalizationProvider>
  );
}

export default SearchForm;
