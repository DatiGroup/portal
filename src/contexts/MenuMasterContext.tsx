import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { MenuProps } from 'types/menu';

const initialState: MenuProps = {
  isDashboardDrawerOpened: false,
  isComponentDrawerOpened: true
};

export type MenuMasterContextType = {
  menuMaster: MenuProps;
  handlerComponentDrawer: (isComponentDrawerOpened: boolean) => void;
  handlerDrawerOpen: (isDashboardDrawerOpened: boolean) => void;
};

const MenuMasterContext = createContext<MenuMasterContextType | undefined>(undefined);

export const MenuMasterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menuMaster, setMenuMaster] = useState<MenuProps>(initialState);

  const handlerComponentDrawer = useCallback((isComponentDrawerOpened: boolean) => {
    setMenuMaster((prev) => ({ ...prev, isComponentDrawerOpened }));
  }, []);

  const handlerDrawerOpen = useCallback((isDashboardDrawerOpened: boolean) => {
    setMenuMaster((prev) => ({ ...prev, isDashboardDrawerOpened }));
  }, []);

  const memoizedValue = useMemo(
    () => ({
      menuMaster,
      handlerComponentDrawer,
      handlerDrawerOpen
    }),
    [menuMaster, handlerComponentDrawer, handlerDrawerOpen]
  );

  return <MenuMasterContext.Provider value={memoizedValue}>{children}</MenuMasterContext.Provider>;
};

export function useMenuMaster() {
  const context = useContext(MenuMasterContext);
  if (!context) {
    throw new Error('useMenuMaster must be used within a MenuMasterProvider');
  }
  return context;
}
