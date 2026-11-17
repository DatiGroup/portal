import CaretDownOutlined from '@ant-design/icons/CaretDownOutlined';
import CaretUpOutlined from '@ant-design/icons/CaretUpOutlined';
import { Box, IconButtonProps, Menu, MenuItem, MenuProps, styled, useTheme } from '@mui/material';
import IconButton from 'components/@extended/IconButton';
import { useEffect, useRef, useState } from 'react';

interface IconDropDownProps extends MenuProps {
  options?: string[];
  selected?: string;
  loading?: boolean;
  onOpen?: (event: React.MouseEvent<HTMLElement>) => void;
  onClose?: (event: React.MouseEvent<HTMLElement>) => void;
}

const DropDownButton = styled(IconButton)<IconButtonProps>(({ theme }) => ({
  fontSize: 14,

  [theme.breakpoints.up('sm')]: {
    fontSize: 16
  },
  [theme.breakpoints.up('md')]: {
    fontSize: 18
  }
}));

const IconDropDown = ({
  options = [],
  selected = '',
  open = false,
  loading = false,
  onOpen = () => {},
  onClose = () => {},
  ...rest
}: IconDropDownProps) => {
  const theme = useTheme();
  const anchorRef = useRef<HTMLButtonElement>(null);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(open);

  useEffect(() => {
    setIsOpen(Boolean(anchorEl));
  }, [anchorEl]);

  useEffect(() => {
    open && setAnchorEl(anchorRef.current);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anchorRef.current]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorRef.current);
    onOpen(event);
  };

  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
    onClose(event);
  };

  return (
    <Box sx={{ width: 'fit-content' }}>
      <DropDownButton
        aria-label="icon-dropdown"
        id={`icon_dropdown_button_${rest.id}`}
        aria-controls={isOpen ? 'icon-dropdown-menu' : undefined}
        aria-expanded={isOpen ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        disabled={options.length < 1}
        ref={anchorRef}
        loading={loading}
      >
        {isOpen && <CaretUpOutlined />}
        {!isOpen && <CaretDownOutlined />}
      </DropDownButton>
      <Menu
        id={`icon_dropdown_menu_${rest.id}`}
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: theme.palette.background.paper
            }
          },
          list: {
            'aria-labelledby': `icon_dropdown_button_${rest.id}`
          }
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} selected={option === selected} onClick={handleClose} id={`dropdownItem_${option}`}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default IconDropDown;
