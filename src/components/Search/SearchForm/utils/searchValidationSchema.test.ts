import { searchValidationSchema } from './searchValidationSchema';

describe('searchValidationSchema', () => {

  it('should fail when only checkinDate is provided', async () => {
    const invalidData = {
      checkinDate: '2024-07-11',
      checkoutDate: null,
    };

    await expect(searchValidationSchema.validate(invalidData)).rejects.toThrow('Both check-in and check-out dates must be provided');
  });

  it('should fail when only checkoutDate is provided', async () => {
    const invalidData = {
      checkinDate: null,
      checkoutDate: '2024-07-15',
    };

    await expect(searchValidationSchema.validate(invalidData)).rejects.toThrow('Both check-in and check-out dates must be provided');
  });

  it('should pass when both dates are null', async () => {
    const validData = {
      checkinDate: null,
      checkoutDate: null,
    };

    await expect(searchValidationSchema.validate(validData)).resolves.toEqual(validData);
  });
});
