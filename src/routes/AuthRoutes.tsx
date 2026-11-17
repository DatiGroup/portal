import { lazy } from 'react';
import Loadable from 'components/Loadable';

// layout
const AuthLayout = Loadable(lazy(() => import('layout/auth/AuthLayout')));

// jwt auth
const LoginPage = Loadable(lazy(() => import('pages/auth/LoginPage')));
const RegisterPage = Loadable(lazy(() => import('pages/auth/RegisterPage')));
const ForgotPasswordPage = Loadable(lazy(() => import('pages/auth/ForgotPasswordPage')));
const ResetPasswordPage = Loadable(lazy(() => import('pages/auth/ResetPasswordPage')));
const AcceptInvitePage = Loadable(lazy(() => import('pages/auth/AcceptInvitePage')));

const AuthRoutes = {
  path: 'auth',
  children: [
    {
      Component: AuthLayout,
      children: [
        { index: true, Component: LoginPage },
        { path: 'login', Component: LoginPage },
        { path: 'register', Component: RegisterPage },
        { path: 'forgot-password', Component: ForgotPasswordPage },
        { path: 'reset-password', Component: ResetPasswordPage },
        { path: 'user-invite/:code', Component: AcceptInvitePage }
      ]
    }
  ]
};

export default AuthRoutes;
