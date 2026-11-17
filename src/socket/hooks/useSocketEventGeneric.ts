import { useContext, useEffect, useRef, type Context } from 'react';
import type { SocketContextValue } from '../webSocket/webSocketType';

interface UseSocketEventOptions<T = any> {
  Context: Context<SocketContextValue>;
  eventName: string;
  handler: (data: T, isMounted: () => boolean) => void | Promise<void>;
  enabled?: boolean;
}

/**
 * Generic hook to subscribe to socket events with proper cleanup
 * Type-safe event handling with mount state tracking
 *
 * @param options - Event subscription options
 * @param options.Context - Socket context to use
 * @param options.eventName - Name of the socket event to listen to
 * @param options.handler - Event handler callback
 * @param options.enabled - Whether subscription is active (default: true)
 *
 * @example
 * useSocketEventGeneric({
 *   Context: UserSocketContext,
 *   eventName: SocketNsp.user.events.updateResource,
 *   handler: (data) => console.log('Resource updated:', data)
 * });
 *
 * @note Following Socket.IO best practices: event listeners should ideally be
 * registered in parent components to avoid missing events when child components
 * are not mounted. Use this hook carefully in child components.
 */
export const useSocketEventGeneric = <T = any>({ Context, eventName, handler, enabled = true }: UseSocketEventOptions<T>) => {
  const { socket, ready } = useContext(Context);
  const mountedRef = useRef(true);
  const handlerRef = useRef(handler);

  // Update handler ref when it changes (prevents re-registration on each render)
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  // Track component mount state
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Subscribe to socket event
  useEffect(() => {
    if (!enabled || !ready || !socket) return;

    const wrappedHandler = async (data: T) => {
      try {
        await handlerRef.current(data, () => mountedRef.current);
      } catch (error) {
        console.error(`Error in socket event handler for '${eventName}':`, error);
      }
    };

    const subscribe = () => {
      socket.on(eventName, wrappedHandler);
    };

    if (socket.connected) {
      subscribe();
    } else {
      socket.once('connect', subscribe);
    }

    // Cleanup: remove all listeners for this specific handler
    return () => {
      socket.off(eventName, wrappedHandler);
      socket.off('connect', subscribe);
    };
  }, [eventName, enabled, ready, socket]);
};

export default useSocketEventGeneric;
