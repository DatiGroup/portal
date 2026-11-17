import ProductOutlined from '@ant-design/icons/ProductOutlined';
import DeploymentUnitOutlined from '@ant-design/icons/DeploymentUnitOutlined';
import ToolOutlined from '@ant-design/icons/ToolOutlined';
import { routePaths } from 'routes/routePaths';
import { RoleEnum } from 'store/type/RoleEnum';
import { NavItemType } from 'types/menu';
import BulbOutlined from '@ant-design/icons/BulbOutlined';
import GroupOutlined from '@ant-design/icons/GroupOutlined';
import Loadable from 'components/Loadable';
import { lazy } from 'react';
import { RobotOutlined } from '@ant-design/icons';

const DigitalTwinsBreadcrumbLayout = Loadable(lazy(() => import('layout/dashboard/breadcrumbs/DigitalTwinsBreadcrumbLayout')));
const DigitalTwinsPage = Loadable(lazy(() => import('pages/dashboard/digitalTwins/digitalTwins/DigitalTwinsPage')));
// const DigitalTwinPage = Loadable(lazy(() => import('pages/dashboard/digitalTwins/digitalTwins/DigitalTwinPage')));
const DigitalTwinBuilderPage = Loadable(lazy(() => import('pages/dashboard/digitalTwins/digitalTwinBuilder/DigitalTwinBuilderPage')));
const FragmentRegistryPage = Loadable(lazy(() => import('pages/dashboard/digitalTwins/fragmentRegistry/FragmentRegistryPage')));
const WidgetRegistryPage = Loadable(lazy(() => import('pages/dashboard/digitalTwins/widgetRegistry/WidgetRegistryPage')));
const SimulationModelRegistryPage = Loadable(
  lazy(() => import('pages/dashboard/digitalTwins/simulationModelRegistry/SimulationModelRegistryPage'))
);
const MachineLearningRegistryPage = Loadable(
  lazy(() => import('pages/dashboard/digitalTwins/machineLearningRegistry/MachineLearningRegistryPage'))
);
const DigitalTwinsSimulations = Loadable(
  lazy(() => import('sections/dashboard/digitalTwins/digitalTwins/components/DigitalTwinsSimulations'))
);
// const DataSourceCatalogPage = Loadable(lazy(() => import('pages/dashboard/digitalTwins/dataSourceCatalog/DataSourceCatalogPage')));

const DigitalTwinsGroup: NavItemType = {
  id: 'digital-twins-group',
  title: 'Digital Twins',
  type: 'group',
  // icon: ProductOutlined,
  allowedRoles: [RoleEnum.admin, RoleEnum.user],
  dashboardRoute: [
    {
      index: true,
      Component: DigitalTwinsBreadcrumbLayout
    }
  ],
  children: [
    {
      id: 'digital-twins',
      title: 'Digital Twins',
      type: 'collapse',
      icon: DeploymentUnitOutlined,
      url: routePaths.dashboard.digitalTwins.root,
      allowedRoles: [RoleEnum.admin, RoleEnum.user],
      dashboardRoute: [
        {
          path: 'digital-twins/*',
          children: [
            {
              path: 'digital-twin/:id/simulations',
              Component: DigitalTwinsSimulations
            },
            {
              path: '*',
              Component: DigitalTwinsPage
            }
          ]
        }
      ],
      children: [
        {
          id: 'digital-twin-builder',
          title: 'Digital Twin Builder',
          type: 'item',
          icon: ToolOutlined,
          url: routePaths.dashboard.digitalTwins.digitalTwinsBuilder,
          allowedRoles: [RoleEnum.admin, RoleEnum.user],
          dashboardRoute: [
            {
              path: 'digital-twin-builder/*',
              Component: DigitalTwinBuilderPage
            }
          ]
        },
        {
          id: 'fragment-registry',
          title: 'Fragment Registry',
          type: 'item',
          icon: GroupOutlined,
          url: routePaths.dashboard.digitalTwins.digitalTwinsFragment,
          allowedRoles: [RoleEnum.admin, RoleEnum.user],
          dashboardRoute: [
            {
              path: 'fragment-registry/*',
              Component: FragmentRegistryPage
            }
          ]
        },
        {
          id: 'widget-registry',
          title: 'Widget Registry',
          type: 'item',
          icon: ProductOutlined,
          url: routePaths.dashboard.digitalTwins.digitalTwinsWidget,
          allowedRoles: [RoleEnum.admin, RoleEnum.user],
          dashboardRoute: [
            {
              path: 'widget-registry/*',
              Component: WidgetRegistryPage
            }
          ]
        },
        {
          id: 'simulation-model-registry',
          title: 'Simulation Model Registry',
          type: 'item',
          icon: BulbOutlined,
          url: routePaths.dashboard.digitalTwins.digitalTwinsSimulation,
          allowedRoles: [RoleEnum.admin, RoleEnum.user],
          dashboardRoute: [
            {
              path: 'simulation-model-registry/*',
              Component: SimulationModelRegistryPage
            }
          ]
        },
        {
          id: 'machine-learning-registry',
          title: 'Machine Learning Registry',
          type: 'item',
          icon: RobotOutlined,
          url: routePaths.dashboard.digitalTwins.digitalTwinsMachine,
          allowedRoles: [RoleEnum.admin, RoleEnum.user],
          dashboardRoute: [
            {
              path: 'machine-learning-registry/*',
              Component: MachineLearningRegistryPage
            }
          ]
        }
        // {
        //   id: 'data-source-catalog',
        //   title: 'Data Source Catalog',
        //   type: 'item',
        //   icon: DatabaseOutlined,
        //   url: routePaths.dashboard.digitalTwins.digitalTwinsData,
        //   allowedRoles: [RoleEnum.admin, RoleEnum.user],
        //   dashboardRoute: [
        //     {
        //       path: 'data-source-catalog/*',
        //       Component: DataSourceCatalogPage
        //     }
        //   ]
        // }
      ]
    }
  ]
};

export default DigitalTwinsGroup;
