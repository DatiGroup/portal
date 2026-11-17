import type { Socket } from 'socket.io-client';
import type { DefaultEventsMap } from '@socket.io/component-emitter';

// ==================== Event Enums ====================

export enum UserSocketEventEnum {
  updateDigitalTwin = 'update-digital-twin'
}

export enum AdminSocketEventEnum {
  userStatusChange = 'user-status-change',
  systemAlert = 'system-alert'
}

// Add more event enums for future namespaces
// export enum NotificationSocketEventEnum { ... }

// ==================== Namespace Configuration ====================

interface NamespaceConfig<T extends Record<string, string>> {
  namespace: string;
  events: T;
}

// Strict type for socket namespaces
interface SocketNspType {
  user: NamespaceConfig<{
    updateDigitalTwin: UserSocketEventEnum.updateDigitalTwin;
  }>;
  // Example: Future admin namespace
  // admin: NamespaceConfig<{
  //   userStatusChange: AdminSocketEventEnum.userStatusChange;
  //   systemAlert: AdminSocketEventEnum.systemAlert;
  // }>;
  // Example: Future notifications namespace
  // notifications: NamespaceConfig<{
  //   newNotification: NotificationSocketEventEnum.newNotification;
  // }>;
}

export const SocketNsp: SocketNspType = {
  user: {
    namespace: '/user',
    events: {
      updateDigitalTwin: UserSocketEventEnum.updateDigitalTwin
    }
  }
  // Add more namespaces as needed:
  // admin: {
  //   namespace: '/admin',
  //   events: {
  //     userStatusChange: AdminSocketEventEnum.userStatusChange,
  //     systemAlert: AdminSocketEventEnum.systemAlert
  //   }
  // }
};

// ==================== Type Definitions ====================

export interface ActiveSocketType {
  [key: string]: Socket<DefaultEventsMap, DefaultEventsMap>;
}

// Type-safe namespace keys
export type NamespaceKey = keyof typeof SocketNsp;

// Extract event enum from namespace
export type NamespaceEvents<T extends NamespaceKey> = (typeof SocketNsp)[T]['events'][keyof (typeof SocketNsp)[T]['events']];

// Socket context value type for any namespace
export interface SocketContextValue {
  socket: Socket<DefaultEventsMap, DefaultEventsMap> | null;
  ready: boolean;
  namespace: string;
}
