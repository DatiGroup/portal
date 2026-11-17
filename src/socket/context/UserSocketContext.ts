import { useContext } from 'react';
import { UserSocketContext } from './SocketContextFactory';

/**
 * Hook to access User Socket Context
 * @returns Socket context value with connection state and socket instance
 * @throws Error if used outside UserSocketProvider
 */
export const useUserSocketContext = () => {
  const context = useContext(UserSocketContext);

  if (!context) {
    throw new Error('useUserSocketContext must be used within UserSocketProvider');
  }

  return context;
};

// Re-export context for backwards compatibility
export { UserSocketContext };
