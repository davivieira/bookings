import * as Yup from 'yup';

export const searchValidationSchema = Yup.object({
  checkinDate: Yup.date().nullable(),
  checkoutDate: Yup.date().nullable(),
}).test('dates-required', 'Both check-in and check-out dates must be provided', function (values) {
  const { checkinDate, checkoutDate } = values;
  if ((checkinDate && !checkoutDate) || (!checkinDate && checkoutDate)) {
    return this.createError({ path: 'checkinDate', message: 'Both check-in and check-out dates must be provided' });
  }
  return true;
});
