import { useState } from 'react';

export type MenuAnchortType = Element | (() => Element) | null | undefined;

const useMenu = () => {
  const [anchorEl, setAnchorEl] = useState<MenuAnchortType>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement> | undefined) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return { anchorEl, handleClick, handleClose };
};

export default useMenu;
