import type { Socket } from 'socket.io-client';
import type { DefaultEventsMap } from '@socket.io/component-emitter';
import { io } from 'socket.io-client';
import config from 'config';

/**
 * Centralized Socket Manager for managing multiple namespace connections
 * Follows singleton pattern per namespace with proper cleanup
 */
class SocketManager {
  private sockets: Map<string, Socket<DefaultEventsMap, DefaultEventsMap>> = new Map();

  /**
   * Initialize or retrieve a socket connection for a specific namespace
   * @param namespace - The namespace path (e.g., '/user', '/admin')
   * @param token - Authentication token
   * @returns Socket instance
   */
  initSocket(namespace: string, token: string): Socket<DefaultEventsMap, DefaultEventsMap> {
    // Return existing socket if already initialized
    console.log('Initializing socket for namespace:', namespace);
    const existingSocket = this.sockets.get(namespace);
    if (existingSocket) {
      return existingSocket;
    }

    // Create new socket connection
    const socket = io(`${config.socketURL}${namespace}`, {
      transports: ['websocket'],
      query: { token },
      auth: { token },
      autoConnect: false,
      withCredentials: true,
      // Add reconnection strategy
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5
    });

    this.sockets.set(namespace, socket);
    return socket;
  }

  /**
   * Get an existing socket for a namespace
   * @param namespace - The namespace path
   * @returns Socket instance or null if not initialized
   */
  getSocket(namespace: string): Socket<DefaultEventsMap, DefaultEventsMap> | null {
    return this.sockets.get(namespace) || null;
  }

  /**
   * Destroy a specific namespace socket connection
   * @param namespace - The namespace path to destroy
   */
  destroySocket(namespace: string): void {
    const socket = this.sockets.get(namespace);
    if (socket) {
      try {
        socket.removeAllListeners();
        socket.disconnect();
        this.sockets.delete(namespace);
      } catch (error) {
        console.error(`Error disconnecting from ${namespace} socket:`, error);
      }
    }
  }

  /**
   * Destroy all socket connections
   * Useful for complete cleanup (e.g., logout)
   */
  destroyAll(): void {
    this.sockets.forEach((socket, namespace) => {
      try {
        socket.removeAllListeners();
        socket.disconnect();
      } catch (error) {
        console.error(`Error disconnecting from ${namespace} socket:`, error);
      }
    });
    this.sockets.clear();
  }

  /**
   * Get all active namespace connections
   * @returns Array of namespace names
   */
  getActiveNamespaces(): string[] {
    return Array.from(this.sockets.keys());
  }

  /**
   * Check if a namespace is connected
   * @param namespace - The namespace path
   * @returns boolean
   */
  isConnected(namespace: string): boolean {
    const socket = this.sockets.get(namespace);
    return socket?.connected || false;
  }
}

// Export singleton instance
export const socketManager = new SocketManager();
