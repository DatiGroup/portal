const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
  LEGAL: '/legal'
};

export const routePaths = {
  auth: {
    root: `${ROOTS.AUTH}`,
    login: `${ROOTS.AUTH}/login`,
    register: `${ROOTS.AUTH}/register`,
    forgotPassword: `${ROOTS.AUTH}/forgot-password`,
    resetPassword: `${ROOTS.AUTH}/reset-password`
  },
  dashboard: {
    root: `${ROOTS.DASHBOARD}`,
    portal: {
      root: `${ROOTS.DASHBOARD}/portal`,
      main: `${ROOTS.DASHBOARD}/portal/main`,
      documentation: `${ROOTS.DASHBOARD}/portal/documentation`
    },
    tool: {
      root: `${ROOTS.DASHBOARD}/tool`,
      lookups: {
        root: `${ROOTS.DASHBOARD}/tool/lookups`,
        lookupAdd: `${ROOTS.DASHBOARD}/tool/lookups/lookup-add`,
        values: (lookupType: string) => `${ROOTS.DASHBOARD}/tool/lookups/${lookupType}/values`,
        valuesAdd: (lookupType: string) => `${ROOTS.DASHBOARD}/tool/lookups/${lookupType}/values/lookup-value-add`
      },
      platformUsers: {
        root: `${ROOTS.DASHBOARD}/tool/platform-users`,
        details: (userId: string | number) => `${ROOTS.DASHBOARD}/tool/platform-users/${userId}/details`
      },
      orgMembers: {
        root: `${ROOTS.DASHBOARD}/tool/org-members`,
        invite: `${ROOTS.DASHBOARD}/tool/org-members/invite`,
        list: `${ROOTS.DASHBOARD}/tool/org-members/list`
      }
    },
    digitalTwins: {
      root: `${ROOTS.DASHBOARD}/digital-twins`,
      digitalTwin: (twinId: string | number) => `${ROOTS.DASHBOARD}/digital-twins/digital-twin/${twinId}`,
      digitalTwinTopology: (twinId: string | number) => `${ROOTS.DASHBOARD}/digital-twins/digital-twin/${twinId}/topology`,
      digitalTwinSimulations: (twinId: string | number) => `${ROOTS.DASHBOARD}/digital-twins/digital-twin/${twinId}/simulations`,
      digitalTwinsBuilder: `${ROOTS.DASHBOARD}/digital-twins/digital-twin-builder`,
      digitalTwinsBuilderDetail: (twinBuilderId: string | number) =>
        `${ROOTS.DASHBOARD}/digital-twins/digital-twin-builder/${twinBuilderId}`,
      digitalTwinsFragment: `${ROOTS.DASHBOARD}/digital-twins/fragment-registry`,
      digitalTwinsWidget: `${ROOTS.DASHBOARD}/digital-twins/widget-registry`,
      digitalTwinsSimulation: `${ROOTS.DASHBOARD}/digital-twins/simulation-model-registry`,
      digitalTwinsData: `${ROOTS.DASHBOARD}/digital-twins/data-source-catalog`,
      digitalTwinsMachine: `${ROOTS.DASHBOARD}/digital-twins/machine-learning-registry`
    }
  },
  legal: {
    root: `${ROOTS.LEGAL}`,
    privacyPolicy: `${ROOTS.LEGAL}/privacy-policy`,
    termsAndConditions: `${ROOTS.LEGAL}/terms-and-conditions`
  }
};
