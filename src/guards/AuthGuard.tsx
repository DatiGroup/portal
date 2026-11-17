import Loader from 'components/Loader';
import { JSX, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// project imports
import useAuth from 'sections/auth/hooks/useAuth';

// types
// import { GuardProps } from 'types/auth';

type MultipleChildren = JSX.Element | JSX.Element[];

// ==============================|| AUTH GUARD ||============================== //

export default function AuthGuard({ children }: { children: MultipleChildren }): MultipleChildren {
  const { isLoggedIn, isInitialized } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/auth/login', {
        replace: true
      });
    }
  }, [isLoggedIn, navigate, location]);

  if (!isInitialized || !isLoggedIn) {
    return <Loader />;
  }

  return children;
}
