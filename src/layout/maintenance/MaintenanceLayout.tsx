import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

// project imports
import Loader from 'components/Loader';
import { SimpleLayoutType } from 'config';

const Header = lazy(() => import('layout/landing/header/Header'));
const FooterBlock = lazy(() => import('layout/landing/footer/Footer'));

// ==============================|| LAYOUT - SIMPLE / LANDING ||============================== //

export default function MaintenanceLayout({ layout = SimpleLayoutType.SIMPLE }: { layout?: SimpleLayoutType }) {
  return (
    <Suspense fallback={<Loader />}>
      <Header />
      <Outlet />
      <FooterBlock isFull={layout === SimpleLayoutType.LANDING} />
    </Suspense>
  );
}
