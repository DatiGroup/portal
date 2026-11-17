# Socket.IO Architecture Documentation

## Overview

This Socket.IO implementation provides a scalable, type-safe architecture for managing multiple socket namespaces in your React application. The architecture follows best practices for separation of concerns, reusability, and maintainability.

## Architecture Components

### 1. Socket Manager (`socketManager.ts`)
Centralized singleton manager for all socket connections.

**Features:**
- Manages multiple namespace connections
- Prevents duplicate connections
- Handles connection lifecycle and cleanup
- Provides reconnection strategy
- Thread-safe socket access

**Key Methods:**
```typescript
socketManager.initSocket(namespace, token)  // Initialize/get socket for namespace
socketManager.getSocket(namespace)          // Get existing socket
socketManager.destroySocket(namespace)      // Destroy specific namespace
socketManager.destroyAll()                  // Destroy all connections (e.g., logout)
socketManager.isConnected(namespace)        // Check connection status
```

### 2. Type Definitions (`webSocketType.ts`)
Type-safe namespace and event configuration.

**Structure:**
```typescript
// 1. Define events for each namespace
export enum UserSocketEventEnum {
  updateResource = 'update-resource'
}

// 2. Configure namespace with events
export const SocketNsp = {
  user: {
    namespace: '/user',
    events: {
      updateResource: UserSocketEventEnum.updateResource
    }
  }
};
```

### 3. Context Factory (`SocketContextFactory.ts`)
Creates React contexts for each namespace using a factory pattern.

**Benefits:**
- Consistent context structure
- Easy to add new namespaces
- Type-safe context values

### 4. Provider Factory (`SocketProviderFactory.tsx`)
Generic provider component that works with any namespace.

**Configuration Options:**
- `namespace`: Socket namespace path
- `Context`: React Context to provide values to
- `autoConnect`: Auto-connect on mount (default: true)
- `requireAuth`: Require authentication token (default: true)

### 5. Generic Hooks

#### `useSocketInit` (Generic)
Initializes socket connection for any namespace with error handling and lifecycle management.

#### `useSocketEventGeneric`
Type-safe event subscription with proper cleanup and mount state tracking.

## Current Implementation

### User Namespace
Currently implemented namespace for user-specific events.

**Files:**
- `UserSocketProvider.tsx` - Provider component
- `UserSocketContext.ts` - Context and hook
- `useSocketUserResource.ts` - User-specific event handlers

**Usage:**

**Where to Place Providers:**

```tsx
// ✅ RECOMMENDED: Dashboard/Authenticated Layout
// Place socket provider at the authenticated section level
import { UserSocketProvider } from 'socket/context/UserSocketProvider';

function DashboardLayout() {
  return (
    <UserSocketProvider>
      <Header />
      <Sidebar />
      <Outlet />  {/* All dashboard routes */}
    </UserSocketProvider>
  );
}

// ⚠️ App.tsx: Only if socket needed globally (notifications, etc.)
function App() {
  return (
    <AuthProvider>
      <UserSocketProvider>  {/* Available everywhere, but uses resources even when not logged in */}
        <AppRouter />
      </UserSocketProvider>
    </AuthProvider>
  );
}

// ❌ AVOID: Route-specific component
function PlatformUserPage() {
  return (
    <UserSocketProvider>  {/* BAD: Disconnects when navigating away */}
      <UserList />
    </UserSocketProvider>
  );
}
```

**Using Socket Events:**

```tsx
// Option 1: Just listen to events (most common)
import useSocketResourceUpdate from 'socket/hooks/useSocketUserResource';

function MyComponent() {
  useSocketResourceUpdate(); // That's it!
}

// Option 2: Access socket directly (for emitting events)
import { useUserSocketContext } from 'socket/context/UserSocketContext';

function MyComponent() {
  const { socket, ready } = useUserSocketContext();
  
  // Emit events to server
  const sendUpdate = () => {
    if (ready && socket) {
      socket.emit('my-event', { data: 'hello' });
    }
  };
}
```

## Adding New Namespaces

Follow these steps to add a new namespace (e.g., Admin):

### Step 1: Define Events in `webSocketType.ts`

```typescript
// Add event enum
export enum AdminSocketEventEnum {
  userStatusChange = 'user-status-change',
  systemAlert = 'system-alert'
}

// Update SocketNspType interface
interface SocketNspType {
  user: NamespaceConfig<{ ... }>;
  admin: NamespaceConfig<{
    userStatusChange: AdminSocketEventEnum.userStatusChange;
    systemAlert: AdminSocketEventEnum.systemAlert;
  }>;
}

// Add to SocketNsp configuration
export const SocketNsp: SocketNspType = {
  user: { ... },
  admin: {
    namespace: '/admin',
    events: {
      userStatusChange: AdminSocketEventEnum.userStatusChange,
      systemAlert: AdminSocketEventEnum.systemAlert
    }
  }
};
```

### Step 2: Create Context in `SocketContextFactory.ts`

```typescript
export const AdminSocketContext = createSocketContext('admin');
```

### Step 3: Create Provider Component

```typescript
// AdminSocketProvider.tsx
import type { ReactNode } from 'react';
import { AdminSocketContext } from './SocketContextFactory';
import { SocketProviderFactory } from './SocketProviderFactory';
import { SocketNsp } from '../webSocket/webSocketType';

interface Props {
  children: ReactNode;
}

export function AdminSocketProvider({ children }: Props) {
  return (
    <SocketProviderFactory
      namespace={SocketNsp.admin.namespace}
      Context={AdminSocketContext}
      autoConnect={true}
      requireAuth={true}
    >
      {children}
    </SocketProviderFactory>
  );
}
```

### Step 4: Create Context Hook

```typescript
// AdminSocketContext.ts
import { useContext } from 'react';
import { AdminSocketContext } from './SocketContextFactory';

export const useAdminSocketContext = () => {
  const context = useContext(AdminSocketContext);
  if (!context) {
    throw new Error('useAdminSocketContext must be used within AdminSocketProvider');
  }
  return context;
};

export { AdminSocketContext };
```

### Step 5: Create Event Hooks

```typescript
// useAdminSocketEvents.ts
import { AdminSocketContext } from 'socket/context/SocketContextFactory';
import { AdminSocketEventEnum } from 'socket/webSocket/webSocketType';
import { useSocketEventGeneric } from './useSocketEventGeneric';

export const useAdminUserStatusChange = (
  handler: (data: any) => void
) => {
  useSocketEventGeneric({
    Context: AdminSocketContext,
    eventName: AdminSocketEventEnum.userStatusChange,
    handler: (data, isMounted) => {
      if (isMounted()) {
        handler(data);
      }
    }
  });
};
```

### Step 6: Use in Application

```tsx
// In your admin section
import { AdminSocketProvider } from 'socket/context/AdminSocketProvider';
import { useAdminUserStatusChange } from 'socket/hooks/useAdminSocketEvents';

function AdminApp() {
  return (
    <AdminSocketProvider>
      <AdminDashboard />
    </AdminSocketProvider>
  );
}

function AdminDashboard() {
  useAdminUserStatusChange((data) => {
    console.log('User status changed:', data);
    // Handle event
  });

  return <div>Admin Dashboard</div>;
}
```

## Best Practices

### 1. Provider Placement

**Choose the right level for your socket provider:**

✅ **Dashboard/Authenticated Layout (Recommended)**
- Connects only when user is authenticated
- Stays connected while navigating between routes
- Automatically disconnects on logout
- Most efficient for auth-required sockets

```tsx
function DashboardLayout() {
  return (
    <UserSocketProvider>
      <Routes>
        <Route path="users" element={<Users />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </UserSocketProvider>
  );
}
```

⚠️ **App Level**
- Only use if socket events needed everywhere (global notifications, alerts)
- Connects even for unauthenticated users (wastes resources)
- Use with `requireAuth={false}` if needed before login

❌ **Route/Component Level**
- Never place provider at individual route/component level
- Socket will disconnect when navigating away
- Will miss events when component is unmounted
- Creates unnecessary reconnection overhead

### 2. Namespace Organization
- Use separate namespaces for different feature domains (user, admin, notifications, etc.)
- Keep namespace-specific logic isolated
- Use clear, descriptive namespace paths

### 2. Event Naming
- Use consistent event naming conventions
- Define events in enums for type safety
- Group related events in the same namespace

### 3. Event Listener Registration

**⚠️ IMPORTANT: Per Socket.IO Official Guidance**

Register event listeners in **parent/top-level components**, not in child components that can mount/unmount.

**Why?** If a child component is not mounted when an event arrives, that event will be missed.

**Recommended Pattern:**
```tsx
// ✅ GOOD: Register in parent component
function App() {
  const [resources, setResources] = useState([]);
  
  // Register listener at app level
  useSocketEventGeneric({
    Context: UserSocketContext,
    eventName: SocketNsp.user.events.updateResource,
    handler: (data) => {
      setResources(data); // Updates state available to all children
    }
  });
  
  return (
    <Dashboard resources={resources} />
  );
}

// ❌ BAD: Register in child that may unmount
function Dashboard() {
  const [resources, setResources] = useState([]);
  
  // If Dashboard unmounts, events will be missed
  useSocketEventGeneric({
    Context: UserSocketContext,
    eventName: SocketNsp.user.events.updateResource,
    handler: (data) => setResources(data)
  });
}
```

**When child component registration is acceptable:**
- UI-specific events (e.g., typing indicators) where missing events is OK
- You understand and accept the trade-off
- You use our mount-state tracking to prevent errors

Reference: [Socket.IO React Guide - Listeners in Child Components](https://socket.io/how-to/use-with-react#listeners-in-a-child-component)

### 4. Connection Management
- Initialize sockets only when needed
- Use `autoConnect: false` for conditional connections
- Clean up connections on logout/unmount
- Use `socketManager.destroyAll()` on logout

### 5. Error Handling
- Always handle connection errors
- Implement reconnection strategies
- Log errors for debugging
- Provide user feedback for connection issues

### 6. Performance
- Memoize socket context values
- Use mount state tracking to prevent state updates on unmounted components
- Unsubscribe from events on cleanup
- Avoid creating new handler functions on every render (use `useRef` for handlers)

### 7. Type Safety
- Use TypeScript enums for events
- Define strict types for event payloads
- Use generic hooks for reusability

### 8. Following Socket.IO Official Guidance
- Register critical event listeners in parent components (see note in #3)
- Use named functions for event handlers (enables proper cleanup)
- Include proper cleanup in useEffect return functions
- Use empty dependency arrays for connection lifecycle
- Handle temporary disconnections gracefully

Reference: [Socket.IO Official React Guide](https://socket.io/how-to/use-with-react)

## Common Patterns

### Conditional Connection
```typescript
<SocketProviderFactory
  namespace="/notifications"
  Context={NotificationSocketContext}
  autoConnect={false}  // Don't auto-connect
  requireAuth={true}
>
  {children}
</SocketProviderFactory>

// Manually connect when needed
const { socket } = useContext(NotificationSocketContext);
socket?.connect();
```

### Multiple Namespaces

```tsx
// Different namespaces can be at different levels based on access
function DashboardLayout() {
  return (
    <UserSocketProvider>  {/* All authenticated users */}
      <Outlet />
    </UserSocketProvider>
  );
}

function AdminLayout() {
  return (
    <AdminSocketProvider>  {/* Only admin routes */}
      <AdminDashboard />
    </AdminSocketProvider>
  );
}

// Or nest them if both needed in same section
function DashboardWithNotifications() {
  return (
    <UserSocketProvider>
      <NotificationSocketProvider>
        <Dashboard />
      </NotificationSocketProvider>
    </UserSocketProvider>
  );
}
```

### Cleanup on Logout
```typescript
import { socketManager } from 'socket/webSocket/socketManager';

function logout() {
  // Destroy all socket connections
  socketManager.destroyAll();
  
  // Clear authentication
  tokenStorage.clearTokens();
  
  // Redirect to login
  navigate('/login');
}
```

## Migration from Old Implementation

The old implementation has been preserved for backwards compatibility. To migrate:

1. Update imports to use new context hooks
2. Replace `useSocketInit()` calls with namespace-specific providers
3. Update event handlers to use type-safe enums
4. Test all socket functionality

Old pattern:
```typescript
const { ready, socket } = useSocketInit();
```

New pattern:
```typescript
const { ready, socket } = useUserSocketContext();
```

## Troubleshooting

### Socket Not Connecting
- Check authentication token is available
- Verify namespace path is correct
- Check server is running and accessible
- Review browser console for connection errors

### Events Not Firing
- Ensure component is within correct Provider
- Verify event names match server implementation
- Check socket is connected (`ready === true`)
- Review event handler cleanup

### Multiple Connections
- Check if socket is being initialized multiple times
- Ensure Provider is not re-rendering unnecessarily
- Use React DevTools to verify Provider structure

## Future Enhancements

Potential improvements for the socket architecture:

1. **Typed Event Payloads**: Define TypeScript interfaces for event data
2. **Room Management**: Add support for socket rooms
3. **Middleware**: Implement middleware for event processing
4. **Queue Management**: Add offline queue for failed events
5. **Metrics**: Add connection monitoring and analytics
6. **Testing**: Create mock socket utilities for testing

## Resources

- [Socket.IO Client Documentation](https://socket.io/docs/v4/client-api/)
- [React Context API](https://react.dev/reference/react/useContext)
- [TypeScript Enums](https://www.typescriptlang.org/docs/handbook/enums.html)
