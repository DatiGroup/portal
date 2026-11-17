import Breadcrumbs from 'components/@extended/Breadcrumbs';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { routePaths } from 'routes/routePaths';

const DigitalTwinsBreadcrumbLayout = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { twinId, twinBuilderId } = useParams();

  // digital twins
  const showDigitalTwins = pathname.includes('digital-twins');

  // digital twins digital twin
  const showDigitalTwin = pathname.includes('digital-twin') && twinId;
  const showDigitalTwinTopology = showDigitalTwin && pathname.includes('topology');
  const showDigitalTwinSimulations = showDigitalTwin && pathname.includes('simulations');

  // digital twins digital twin builder
  const showDigitalTwinsBuilder = pathname.includes('digital-twin-builder');
  const showDigitalTwinsBuilderDetail = showDigitalTwinsBuilder && twinBuilderId;

  // digital twins fragment registry
  const showDigitalTwinsFragment = pathname.includes('fragment-registry');

  // digital twins widget registry
  const showDigitalTwinsWidget = pathname.includes('widget-registry');

  // digital twins simulation model registry
  const showDigitalTwinsSimulation = pathname.includes('simulation-model-registry');

  // digital twins data source catalog
  const showDigitalTwinsData = pathname.includes('data-source-catalog');

  // digital twins machine learning registry
  const showDigitalTwinsMachine = pathname.includes('machine-learning-registry');

  const breadcrumbLinks = [
    { title: t('home'), to: routePaths.dashboard.portal.main },

    // digital twins
    ...(showDigitalTwins ? [{ title: t('drawer.collapse.digital-twins'), to: routePaths.dashboard.digitalTwins.root }] : []),

    // digital twins digital twin
    ...(showDigitalTwin
      ? [{ title: t('digitalTwins.digitalTwin.index'), to: routePaths.dashboard.digitalTwins.digitalTwin(twinId!) }]
      : []),
    ...(showDigitalTwinTopology
      ? [{ title: t('digitalTwins.digitalTwin.topology'), to: routePaths.dashboard.digitalTwins.digitalTwinTopology(twinId!) }]
      : []),
    ...(showDigitalTwinSimulations
      ? [{ title: t('digitalTwins.digitalTwin.simulations'), to: routePaths.dashboard.digitalTwins.digitalTwinSimulations(twinId!) }]
      : []),

    // digital twins digital twin builder
    ...(showDigitalTwinsBuilder
      ? [{ title: t('drawer.item.digital-twin-builder'), to: routePaths.dashboard.digitalTwins.digitalTwinsBuilder }]
      : []),
    ...(showDigitalTwinsBuilderDetail
      ? [
          {
            title: t('digitalTwins.digitalTwinBuilder.details'),
            to: routePaths.dashboard.digitalTwins.digitalTwinsBuilderDetail(twinBuilderId!)
          }
        ]
      : []),

    // digital twins fragment registry
    ...(showDigitalTwinsFragment
      ? [{ title: t('drawer.item.fragment-registry'), to: routePaths.dashboard.digitalTwins.digitalTwinsFragment }]
      : []),

    // digital twins widget registry
    ...(showDigitalTwinsWidget
      ? [{ title: t('drawer.item.widget-registry'), to: routePaths.dashboard.digitalTwins.digitalTwinsWidget }]
      : []),

    // digital twins simulation model registry
    ...(showDigitalTwinsSimulation
      ? [{ title: t('drawer.item.simulation-model-registry'), to: routePaths.dashboard.digitalTwins.digitalTwinsSimulation }]
      : []),

    // digital twins data source catalog
    ...(showDigitalTwinsData
      ? [{ title: t('drawer.item.data-source-catalog'), to: routePaths.dashboard.digitalTwins.digitalTwinsData }]
      : []),

    // digital twins machine learning registry
    ...(showDigitalTwinsMachine
      ? [{ title: t('drawer.item.machine-learning-registry'), to: routePaths.dashboard.digitalTwins.digitalTwinsMachine }]
      : [])
  ];

  const header = breadcrumbLinks[breadcrumbLinks.length - 1].title;

  return (
    <>
      <Breadcrumbs custom heading={header} links={breadcrumbLinks} />
      <Outlet />
    </>
  );
};

export default DigitalTwinsBreadcrumbLayout;
