# Socket.IO Architecture Diagram

## Current Architecture Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         Application                              │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │              UserSocketProvider                         │    │
│  │  ┌──────────────────────────────────────────────────┐  │    │
│  │  │      SocketProviderFactory                        │  │    │
│  │  │  • namespace: '/user'                            │  │    │
│  │  │  • Context: UserSocketContext                    │  │    │
│  │  │  • autoConnect: true                             │  │    │
│  │  │  • requireAuth: true                             │  │    │
│  │  │                                                   │  │    │
│  │  │  Uses: useSocketInit()                           │  │    │
│  │  │         ↓ calls socketManager.initSocket()       │  │    │
│  │  └──────────────────────────────────────────────────┘  │    │
│  │                          │                              │    │
│  │                          ▼                              │    │
│  │              Provides UserSocketContext                 │    │
│  │              { socket, ready, namespace }               │    │
│  └────────────────────────────────────────────────────────┘    │
│                          │                                      │
│  ┌───────────────────────┼──────────────────────────────┐     │
│  │                       │                               │     │
│  │  Component A          │          Component B          │     │
│  │  ┌────────────────┐   │   ┌────────────────────────┐ │     │
│  │  │useUserSocket   │   │   │useSocketResourceUpdate │ │     │
│  │  │Context()       │   │   │                        │ │     │
│  │  │                │   │   │  Listens to events     │ │     │
│  │  │Gets socket &   │   │   │  from socket           │ │     │
│  │  │ready state     │   │   │                        │ │     │
│  │  └────────────────┘   │   └────────────────────────┘ │     │
│  └───────────────────────┴──────────────────────────────┘     │
└──────────────────────────────────────────────────────────────────┘

              ┌───────────────────────┐
              │   SocketManager       │  ← Singleton (single instance)
              │  (Created on import)  │     shared by entire app
              │                       │
              │  sockets: Map {       │
              │    '/user': Socket,   │
              │    '/admin': Socket,  │
              │  }                    │
              │                       │
              │  Methods:             │
              │  • initSocket()       │
              │  • getSocket()        │
              │  • destroySocket()    │
              │  • destroyAll()       │
              └───────────────────────┘
                          │
                          ▼
              ┌───────────────────────┐
              │   Socket.IO Server    │
              │                       │
              │   Namespaces:         │
              │   • /user             │
              │   • /admin            │
              │   • /notifications    │
              └───────────────────────┘
```

## Future Multi-Namespace Architecture

When you add more namespaces (admin, notifications, etc.), they all follow the same pattern:

```
┌────────────────────────────────────────────────────────────────────┐
│                         Application                                 │
│                                                                     │
│  ┌────────────────┐  ┌────────────────┐  ┌──────────────────────┐ │
│  │ UserSocket     │  │ AdminSocket    │  │ NotificationSocket   │ │
│  │ Provider       │  │ Provider       │  │ Provider             │ │
│  │                │  │                │  │                      │ │
│  │ namespace:     │  │ namespace:     │  │ namespace:           │ │
│  │ '/user'        │  │ '/admin'       │  │ '/notifications'     │ │
│  └────────────────┘  └────────────────┘  └──────────────────────┘ │
│         │                    │                      │              │
│         ▼                    ▼                      ▼              │
│  ┌────────────────┐  ┌────────────────┐  ┌──────────────────────┐ │
│  │ UserSocket     │  │ AdminSocket    │  │ NotificationSocket   │ │
│  │ Context        │  │ Context        │  │ Context              │ │
│  └────────────────┘  └────────────────┘  └──────────────────────┘ │
│         │                    │                      │              │
│  ┌──────┴──────────┐  ┌──────┴────────┐  ┌─────────┴───────────┐ │
│  │ • Dashboard     │  │ • Admin Panel │  │ • Notification      │ │
│  │ • Profile       │  │ • User Mgmt   │  │   Center            │ │
│  │ • Resources     │  │ • System Logs │  │ • Alerts            │ │
│  └─────────────────┘  └───────────────┘  └─────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘

Note: All providers use the same SocketManager singleton (shown in first diagram).
      Each provider calls socketManager.initSocket() with its namespace.
```

## Component Interaction Flow

```
User Action
    │
    ▼
┌────────────────┐
│  Component     │
│  (useSocket    │──────┐
│   ResourceUp   │      │
│   date)        │      │
└────────────────┘      │
                        │ Subscribes to event
                        ▼
              ┌──────────────────┐
              │ useSocketEvent   │
              │                  │
              │ • Validates      │
              │ • Wraps handler  │
              │ • Cleanup        │
              └──────────────────┘
                        │
                        │ Gets socket from
                        ▼
              ┌──────────────────┐
              │ UserSocket       │
              │ Context          │
              │                  │
              │ { socket, ready }│
              └──────────────────┘
                        │
                        │ Socket instance from
                        ▼
              ┌──────────────────┐
              │ SocketManager    │
              │                  │
              │ sockets.get(     │
              │   '/user'        │
              │ )                │
              └──────────────────┘
                        │
                        │ Emits/Receives
                        ▼
              ┌──────────────────┐
              │ Socket.IO Server │
              │                  │
              │ namespace: /user │
              └──────────────────┘
                        │
                        │ Event: 'update-resource'
                        ▼
              ┌──────────────────┐
              │ Event Handler    │
              │                  │
              │ dispatch(        │
              │   invalidateTags │
              │ )                │
              └──────────────────┘
                        │
                        ▼
              ┌──────────────────┐
              │ Redux Store      │
              │ Updates          │
              └──────────────────┘
                        │
                        ▼
              ┌──────────────────┐
              │ UI Re-renders    │
              └──────────────────┘
```

## Adding New Namespace - Visual Guide

```
Step 1: Define Event Enum               Step 2: Add to SocketNsp
┌────────────────────────┐              ┌──────────────────────────┐
│ webSocketType.ts       │              │ webSocketType.ts         │
│                        │              │                          │
│ enum AdminSocket       │              │ SocketNsp = {            │
│   EventEnum {          │─────────────▶│   user: { ... },         │
│   userStatusChange,    │              │   admin: {               │
│   systemAlert          │              │     namespace: '/admin', │
│ }                      │              │     events: { ... }      │
└────────────────────────┘              │   }                      │
                                        │ }                        │
                                        └──────────────────────────┘
           │                                        │
           │                                        │
           ▼                                        ▼
Step 3: Create Context                 Step 4: Create Provider
┌────────────────────────┐              ┌──────────────────────────┐
│ SocketContextFactory   │              │ AdminSocketProvider.tsx  │
│                        │              │                          │
│ export const Admin     │              │ export function Admin    │
│   SocketContext =      │─────────────▶│   SocketProvider() {     │
│   createSocket         │              │   return <SocketProvider │
│   Context('admin')     │              │     Factory ... />       │
│                        │              │ }                        │
└────────────────────────┘              └──────────────────────────┘
                                                   │
                                                   │
                                                   ▼
                                        Step 5: Use in App
                                        ┌──────────────────────────┐
                                        │ App.tsx                  │
                                        │                          │
                                        │ <UserSocketProvider>     │
                                        │   <AdminSocketProvider>  │
                                        │     <Dashboard />        │
                                        │   </AdminSocketProvider> │
                                        │ </UserSocketProvider>    │
                                        └──────────────────────────┘
```

## File Organization

```
src/socket/
│
├── context/
│   ├── SocketContextFactory.ts         # Creates contexts
│   ├── SocketProviderFactory.tsx       # Generic provider
│   ├── UserSocketContext.ts            # User context hook
│   └── UserSocketProvider.tsx          # User provider
│
├── hooks/
│   ├── useSocketInitGeneric.ts         # Generic init hook
│   ├── useSocketEventGeneric.ts        # Generic event hook
│   └── useSocketUserResource.ts        # User-specific events
│
├── webSocket/
│   ├── socketManager.ts                # Central manager ⭐
│   └── webSocketType.ts                # Type definitions ⭐
│
├── README.md                           # Full documentation
├── IMPROVEMENTS.md                     # Summary of changes
└── ARCHITECTURE.md                     # This file
```

## Key Design Patterns

1. **Singleton Pattern**: SocketManager ensures one instance per namespace
2. **Factory Pattern**: Create contexts and providers generically
3. **Provider Pattern**: React Context for dependency injection
4. **Hook Pattern**: Encapsulate socket logic in reusable hooks
5. **Type Safety**: TypeScript generics for compile-time checks

## Benefits Summary

✅ **Scalable**: Add namespaces without modifying core code  
✅ **Type-Safe**: Full TypeScript support  
✅ **Maintainable**: Clear separation of concerns  
✅ **Reusable**: Generic components for all namespaces  
✅ **Testable**: Each component has single responsibility  
✅ **Documented**: Comprehensive docs and examples  
