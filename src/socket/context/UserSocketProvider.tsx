import type { ReactNode } from 'react';
import { UserSocketContext } from './SocketContextFactory';
import { SocketProviderFactory } from './SocketProviderFactory';
import { SocketNsp } from '../webSocket/webSocketType';

interface Props {
  children: ReactNode;
}

/**
 * User Socket Provider
 * Manages socket connection for the /user namespace
 * Handles authentication and connection lifecycle
 */
export function UserSocketProvider({ children }: Props) {
  return (
    <SocketProviderFactory namespace={SocketNsp.user.namespace} Context={UserSocketContext} autoConnect={true} requireAuth={true}>
      {children}
    </SocketProviderFactory>
  );
}
