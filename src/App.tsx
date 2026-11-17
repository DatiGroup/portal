import ThemeCustomization from 'themes';
import { Provider } from 'react-redux';

import RTLLayout from 'components/RTLLayout';
import ScrollTop from 'components/ScrollTop';
import { AuthProvider } from 'sections/auth/context/AuthProvider';
import { store } from 'store/store';
import { LocalizationProvider } from 'locales/calendar/LocalizationProvider';
import './locales/i18n';
import { useEffect, useState } from 'react';
import i18next from './locales/i18n';
import { Toast } from 'components/toast/Toast';
import AppRouter from 'routes/AppRouter';
import { MenuMasterProvider } from 'contexts/MenuMasterContext';
import { ScreenLoading } from 'components/ScreenLoading';
import AppErrorBoundary from 'components/AppErrorBoundary';

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App() {
  const [ready, setReady] = useState(i18next.isInitialized);
  useEffect(() => {
    if (!i18next.isInitialized) {
      i18next.on('initialized', () => setReady(true));
    }
  }, []);

  if (!ready) return <ScreenLoading />;

  return (
    <>
      <Provider store={store}>
        <ThemeCustomization>
          <AppErrorBoundary>
            <RTLLayout>
              <LocalizationProvider>
                <ScrollTop>
                  <AuthProvider>
                    <MenuMasterProvider>
                      <AppRouter />
                      {/*   <RouterProvider router={router} /> */}
                      <Toast />
                    </MenuMasterProvider>
                  </AuthProvider>
                </ScrollTop>
              </LocalizationProvider>
            </RTLLayout>
          </AppErrorBoundary>
        </ThemeCustomization>
      </Provider>
    </>
  );
}
