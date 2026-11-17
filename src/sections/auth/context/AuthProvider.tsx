import { useMemo, useState, useEffect, useCallback, createContext } from 'react';
import { handleLogin, handleLogout, refreshToken } from 'store/slices/auth/authSlice';
import { AuthUserType } from 'store/slices/auth/authTypes';
import { useGetMeDataQuery } from 'store/slices/me/slice';
import { MeDataType } from 'store/slices/me/types';
import { useGetActiveOrgQuery } from 'store/slices/organizations/organizationSlice';
import { ActiveOrgType } from 'store/slices/organizations/organizationTypes';
import { dispatch, useSelector } from 'store/store';
import { tokenUtils } from 'utils/tokenStorage';

type Props = {
  children: React.ReactNode;
};

export type AuthContextValue = {
  isLoggedIn: boolean;
  resetPassword: (data: any) => Promise<void>;
  isInitialized?: boolean;
  user?: AuthUserType | null | undefined;
  userRoles: string[];
  userLanguage?: string;
  meData?: MeDataType;
  activeOrg?: ActiveOrgType;
  logout: () => void;
  login: (email: string, password: string) => Promise<any>;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: Props) {
  const { user, isAuthenticated, userRoles, expireTime, loading } = useSelector((state) => state.auth);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const { data: meData } = useGetMeDataQuery(undefined, { skip: !isAuthenticated });
  const { data: activeOrg } = useGetActiveOrgQuery(undefined, { skip: !isAuthenticated });
  // Initialize data on auth
  useEffect(() => {
    const initialize = async () => {
      try {
        if (isAuthenticated && !user?.userId) {
          // HERE WE put api call , that provides portal wide data
          // and should  be called before app get initialized status
          // await dispatch(getUserInfo());
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        await dispatch(handleLogout());
        setIsInitialized(true);
      } finally {
        setIsInitialized(false);
      }
    };
    initialize();
  }, [isAuthenticated, user?.userId]);

  // Setup automatic token refresh when authenticated
  useEffect(() => {
    const hasValidToken = tokenUtils.isAuthenticated();
    if (!expireTime || !isAuthenticated || !user || !hasValidToken) return;

    const expireInMs = tokenUtils.getMsUntilJwtExpires(expireTime);
    const refreshAfter = expireInMs - 10000; // 10 seconds before expiry

    const timeoutId = setTimeout(() => {
      dispatch(refreshToken());
    }, refreshAfter);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [expireTime, isAuthenticated, user]);

  const logout = useCallback(async () => {
    try {
      await dispatch(handleLogout());
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<any> => await dispatch(handleLogin({ userName: email, password })),
    []
  );

  // Memoized context value
  const contextValue = useMemo(
    () => ({
      isInitialized: isInitialized || !loading,
      resetPassword: () => Promise.resolve(),
      isLoggedIn: isAuthenticated,
      user,
      userRoles: userRoles || [],
      meData: meData,
      activeOrg: activeOrg,
      login,
      logout
    }),
    [isInitialized, isAuthenticated, user, activeOrg, loading, userRoles, meData, login, logout]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
