import { useEffect, useState } from 'react';
import type { Socket } from 'socket.io-client';
import type { DefaultEventsMap } from '@socket.io/component-emitter';
import { socketManager } from '../webSocket/socketManager';
import { tokenStorage } from 'utils/tokenUtils';

interface UseSocketInitOptions {
  namespace: string;
  autoConnect?: boolean;
  requireAuth?: boolean;
}

interface UseSocketInitReturn {
  ready: boolean;
  socket: Socket<DefaultEventsMap, DefaultEventsMap> | null;
  error: Error | null;
}

/**
 * Generic hook to initialize socket connection for any namespace
 * Handles connection lifecycle, authentication, and cleanup
 *
 * @param options - Configuration options
 * @param options.namespace - Namespace path (e.g., '/user', '/admin')
 * @param options.autoConnect - Whether to auto-connect on mount (default: true)
 * @param options.requireAuth - Whether authentication token is required (default: true)
 * @returns Socket state and instance
 *
 * @example
 * const { ready, socket } = useSocketInit({ namespace: '/user' });
 * const { ready, socket } = useSocketInit({ namespace: '/admin', requireAuth: true });
 */
export const useSocketInit = ({ namespace, autoConnect = true, requireAuth = true }: UseSocketInitOptions): UseSocketInitReturn => {
  const [ready, setReady] = useState(false);
  const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Reset state
    setReady(false);
    setError(null);

    // Check for authentication token if required
    const token = tokenStorage.getAccessToken();
    if (requireAuth && !token) {
      setSocket(null);
      setReady(false);
      setError(new Error('Authentication token not found'));
      return;
    }

    try {
      // Initialize socket through manager
      const socketInstance = socketManager.initSocket(namespace, token || '');
      setSocket(socketInstance);

      // Connect if autoConnect is enabled
      if (autoConnect && !socketInstance.connected) {
        socketInstance.connect();
      }

      // Handle connection events
      const handleConnect = () => {
        setReady(true);
        setError(null);
      };

      const handleDisconnect = (reason: string) => {
        setReady(false);
        console.warn(`Socket ${namespace} disconnected:`, reason);
      };

      const handleConnectError = (err: Error) => {
        setReady(false);
        setError(err);
        console.error(`Socket ${namespace} connection error:`, err);
      };

      // Set ready state based on current connection status
      if (socketInstance.connected) {
        setReady(true);
      } else {
        socketInstance.once('connect', handleConnect);
      }

      // Attach event listeners
      socketInstance.on('disconnect', handleDisconnect);
      socketInstance.on('connect_error', handleConnectError);

      // Cleanup function
      return () => {
        socketInstance.off('connect', handleConnect);
        socketInstance.off('disconnect', handleDisconnect);
        socketInstance.off('connect_error', handleConnectError);

        // Destroy socket connection for this namespace
        socketManager.destroySocket(namespace);
        setReady(false);
        setSocket(null);
      };
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown socket initialization error');
      setError(error);
      console.error(`Error initializing socket for ${namespace}:`, err);
    }
  }, [namespace, autoConnect, requireAuth]);

  return { ready, socket, error };
};

export default useSocketInit;
