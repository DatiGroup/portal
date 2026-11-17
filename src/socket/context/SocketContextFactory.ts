import { createContext } from 'react';
import type { SocketContextValue } from '../webSocket/webSocketType';

/**
 * Factory function to create a Socket Context for any namespace
 * This promotes reusability and consistency across different namespace contexts
 *
 * @param namespace - The namespace identifier (e.g., 'user', 'admin')
 * @returns React Context with socket state
 *
 * @example
 * export const UserSocketContext = createSocketContext('user');
 * export const AdminSocketContext = createSocketContext('admin');
 */
export const createSocketContext = (namespace: string) => {
  return createContext<SocketContextValue>({
    socket: null,
    ready: false,
    namespace
  });
};

// Create contexts for each namespace
export const UserSocketContext = createSocketContext('user');

// Example: Future namespaces
// export const AdminSocketContext = createSocketContext('admin');
// export const NotificationSocketContext = createSocketContext('notifications');
