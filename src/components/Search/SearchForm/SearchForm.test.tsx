/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import SearchForm from './SearchForm';

jest.mock('@/styles', () => ({
  SCForm: ({ children }: { children: React.ReactNode }) => <form>{children}</form>,
  SCErrorMessage: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));
jest.mock('./SearchForm.styles', () => ({
  SCSearchButton: ({ children, ...props }: { children: React.ReactNode, [key: string]: any }) => <button {...props}>{children}</button>,
  SDatePicker: ({ label, value, onChange }: { label: string, value: any, onChange: any }) => (
    <input
      aria-label={label}
      value={value ? dayjs(value).format('YYYY-MM-DD') : ''}
      onChange={(e) => onChange(dayjs(e.target.value))}
      type="date"
    />
  ),
  SDateRangeInputGroup: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));
jest.mock('@/utils', () => ({
  useSearchParams: () => ({
    get: jest.fn((param: string) => {
      if (param === 'checkinDate') return '2024-07-11';
      if (param === 'checkoutDate') return '2024-07-15';
      return null;
    }),
  }),
}));

describe('SearchForm', () => {
  const CardWrapper = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;

  const renderWithProviders = (ui: React.ReactElement) => {
    return render(
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {ui}
        </LocalizationProvider>
      </BrowserRouter>
    );
  };

  it('renders the form with initial values from search params', async () => {
    renderWithProviders(<SearchForm CardWrapper={CardWrapper} />);

    expect(screen.getByLabelText('Check-in Date')).toHaveValue('2024-07-11');
    expect(screen.getByLabelText('Check-out Date')).toHaveValue('2024-07-15');
  });
});
