import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import GenericPopover from './GenericPopover';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
jest.mock('@mui/material/Popover', () => (props: any) => (
  <div id={props.id} data-testid="popover">
    {props.open ? props.children : null}
  </div>
));

const TriggerButton: React.FC<{ onClick: (event: React.MouseEvent<HTMLButtonElement>) => void }> = ({ onClick }) => (
  <button onClick={onClick}>Open Popover</button>
);

const ChildComponent: React.FC<{ handleClose: () => void }> = ({ handleClose }) => (
  <div>
    <button onClick={handleClose}>Close Popover</button>
    <div>Popover Content</div>
  </div>
);

describe('GenericPopover', () => {

  it('matches snapshot', () => {
    const { asFragment } = render(
      <GenericPopover TriggerButton={TriggerButton}>
        <div>Popover Content</div>
      </GenericPopover>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the TriggerButton', () => {
    render(
      <GenericPopover TriggerButton={TriggerButton}>
        <div>Popover Content</div>
      </GenericPopover>
    );

    expect(screen.getByText('Open Popover')).toBeInTheDocument();
  });

  it('opens the popover when TriggerButton is clicked', async () => {
    const user = userEvent.setup();

    render(
      <GenericPopover TriggerButton={TriggerButton}>
        <div>Popover Content</div>
      </GenericPopover>
    );

    await user.click(screen.getByText('Open Popover'));

    expect(screen.getByTestId('popover')).toBeInTheDocument();
    expect(screen.getByText('Popover Content')).toBeInTheDocument();
  });

  it('closes the popover when handleClose is called', async () => {
    const user = userEvent.setup();

    render(
      <GenericPopover TriggerButton={TriggerButton}>
        <ChildComponent handleClose={() => null} />
      </GenericPopover>
    );

    await user.click(screen.getByText('Open Popover'));
    expect(screen.getByText('Popover Content')).toBeInTheDocument();

    await user.click(screen.getByText('Close Popover'));
    expect(screen.queryByText('Popover Content')).not.toBeInTheDocument();
  });

  it('passes handleClose to children', async () => {
    const user = userEvent.setup();

    render(
      <GenericPopover TriggerButton={TriggerButton}>
        <ChildComponent handleClose={() => null} />
      </GenericPopover>
    );

    await user.click(screen.getByText('Open Popover'));

    const closeButton = screen.getByText('Close Popover');
    expect(closeButton).toBeInTheDocument();

    await user.click(closeButton);
    expect(screen.queryByText('Popover Content')).not.toBeInTheDocument();
  });
});
