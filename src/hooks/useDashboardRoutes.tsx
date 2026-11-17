import type { RouteObject } from 'react-router';
import useMenuItems from './useMenuItems';
import { NavItemType } from 'types/menu';

function extractDashboardRoutes(items: NavItemType[]): RouteObject[] {
  let routes: RouteObject[] = [];

  items.forEach((item) => {
    if (item.dashboardRoute && Array.isArray(item.dashboardRoute)) {
      if (item.children && Array.isArray(item.children)) {
        const childRoutes = extractDashboardRoutes(item.children);
        const level: RouteObject[] = item.dashboardRoute.map((route) => ({
          ...route,
          index: false,
          children: [...(route.children ?? []), ...childRoutes]
        }));
        routes = routes.concat(level);
      } else {
        routes = routes.concat(item.dashboardRoute);
      }
    }
  });

  return routes;
}

export function useDashboardRoutes(): RouteObject[] {
  const menuItems = useMenuItems();
  const routes = extractDashboardRoutes(menuItems.items);
  return routes;
}
