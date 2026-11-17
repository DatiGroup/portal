import { JSX, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// project imports
import { APP_DEFAULT_PATH } from 'config';
import useAuth from 'sections/auth/hooks/useAuth';

// types
// import { GuardProps } from 'types/auth';

// ==============================|| GUEST GUARD ||============================== //

export default function GuestGuard({ children }: { children: JSX.Element[] }): JSX.Element[] {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoggedIn) {
      navigate(APP_DEFAULT_PATH, {
        replace: true
      });
    }
  }, [isLoggedIn, navigate, location]);

  return children;
}
