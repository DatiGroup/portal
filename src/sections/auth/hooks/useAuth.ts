import { useContext } from 'react';
import { AuthContext } from 'sections/auth/context/AuthProvider';

export default function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext: Context must be used inside AuthProvider');
  }

  return context;
}
