import { lazy } from 'react';
import Loadable from 'components/Loadable';

// layout
const AuthLayout = Loadable(lazy(() => import('layout/auth/AuthLayout')));

// pages
const PrivacyPolicy = Loadable(lazy(() => import('pages/legal/PrivacyPolicy')));
const TermsAndConditions = Loadable(lazy(() => import('pages/legal/TermsAndConditions')));

// ==============================|| LEGAL PAGES ROUTING ||============================== //
const LegalRoutes = {
  path: 'legal',
  Component: AuthLayout,
  children: [
    { path: 'privacy-policy', Component: PrivacyPolicy },
    { path: 'terms-and-conditions', Component: TermsAndConditions }
  ]
};

export default LegalRoutes;
