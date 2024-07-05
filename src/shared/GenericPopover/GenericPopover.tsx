/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import Popover from '@mui/material/Popover';

type TriggerButtonProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

type GenericPopoverProps = {
  children: React.ReactNode;
  TriggerButton: React.ComponentType<TriggerButtonProps>;
};

function GenericPopover({ children, TriggerButton }: GenericPopoverProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <TriggerButton onClick={handleClick} />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {React.isValidElement(children) &&
          React.cloneElement(children as React.ReactElement<any>, { handleClose })}
      </Popover>
    </>
  );
}

export default GenericPopover;