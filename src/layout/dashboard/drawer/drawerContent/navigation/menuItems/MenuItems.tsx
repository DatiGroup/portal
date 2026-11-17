// project imports
import PortalGroup from 'layout/dashboard/drawer/drawerContent/navigation/menuItems/groups/PortalGroup';
import ToolGroup from 'layout/dashboard/drawer/drawerContent/navigation/menuItems/groups/ToolGroup';
import DigitalTwinsGroup from 'layout/dashboard/drawer/drawerContent/navigation/menuItems/groups/DigitalTwins';

// types
import { NavItemType } from 'types/menu';

const MenuItems: { items: NavItemType[] } = {
  items: [PortalGroup, DigitalTwinsGroup, ToolGroup]
};

export default MenuItems;
