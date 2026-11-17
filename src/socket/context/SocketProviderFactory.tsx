import { useMemo, type ReactNode, type Context } from 'react';
import type { SocketContextValue } from '../webSocket/webSocketType';
import { useSocketInit } from '../hooks/useSocketInitGeneric';

interface SocketProviderFactoryProps {
  children: ReactNode;
  namespace: string;
  Context: Context<SocketContextValue>;
  autoConnect?: boolean;
  requireAuth?: boolean;
}

/**
 * Generic Socket Provider component factory
 * Creates a provider for any namespace with consistent behavior
 *
 * @param props - Provider configuration
 * @param props.children - Child components
 * @param props.namespace - Socket namespace path
 * @param props.Context - React Context to provide values to
 * @param props.autoConnect - Auto-connect on mount (default: true)
 * @param props.requireAuth - Require authentication (default: true)
 *
 * @example
 * <SocketProviderFactory
 *   namespace="/user"
 *   Context={UserSocketContext}
 * >
 *   <App />
 * </SocketProviderFactory>
 */
export function SocketProviderFactory({
  children,
  namespace,
  Context,
  autoConnect = true,
  requireAuth = true
}: SocketProviderFactoryProps) {
  const { ready, socket, error } = useSocketInit({
    namespace,
    autoConnect,
    requireAuth
  });

  const memoizedValue = useMemo(
    () => ({
      ready,
      socket,
      namespace,
      error
    }),
    [ready, socket, namespace, error]
  );

  return <Context.Provider value={memoizedValue}>{children}</Context.Provider>;
}
