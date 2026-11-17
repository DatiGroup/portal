import { lazy } from 'react';
import { Outlet } from 'react-router-dom';

// project imports
import GuestGuard from 'guards/GuestGuard';

const Header = lazy(() => import('layout/landing/header/Header'));
const Footer = lazy(() => import('layout/landing/footer/Footer'));

// ==============================|| LAYOUT - AUTH ||============================== //

export default function AuthLayout() {
  return (
    <GuestGuard>
      <Header />
      <Outlet />
      <Footer />
    </GuestGuard>
  );
}
