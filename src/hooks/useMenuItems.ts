import MenuItems from 'layout/dashboard/drawer/drawerContent/navigation/menuItems/MenuItems';
import intersection from 'lodash-es/intersection';
import { useSelector } from 'store/store';
import { NavItemType } from 'types/menu';

interface PermissionOptions {
  allowedRoles?: string[];
  userRoles: string[];
}

function canAccess({ allowedRoles, userRoles }: PermissionOptions): boolean {
  if (!allowedRoles || allowedRoles?.length === 0) return true;

  return intersection(allowedRoles, userRoles).length > 0;
}

const useMenuItems = () => {
  const { userRoles } = useSelector((state) => state.auth);

  // Recursive function to filter items and their children/elements
  const filterNavItems = (items: NavItemType[] = []): NavItemType[] => {
    return items
      .filter((item) => canAccess({ allowedRoles: item.allowedRoles, userRoles }))
      .map((item) => {
        // Recursively filter children and elements
        const filteredChildren = item.children ? filterNavItems(item.children) : undefined;
        const filteredElements = item.elements ? filterNavItems(item.elements) : undefined;
        return {
          ...item,
          ...(filteredChildren && { children: filteredChildren }),
          ...(filteredElements && { elements: filteredElements })
        };
      });
  };

  const allowedItems = filterNavItems(MenuItems.items);
  const result = { ...MenuItems, items: allowedItems };

  return result;
};

export default useMenuItems;
