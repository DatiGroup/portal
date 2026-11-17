import { UserSocketContext } from 'socket/context/SocketContextFactory';
import { SocketNsp } from 'socket/webSocket/webSocketType';
import { useSocketEventGeneric } from './useSocketEventGeneric';
import { dispatch } from 'store/store';
import { statusApi } from 'store/slices/status/slice';

/**
 * Hook to listen for resource update events from the user socket namespace
 * When a resource update event is received, invalidates the productResources cache
 *
 * @note This should be registered in a top-level component to ensure events
 * are not missed when child components unmount
 */
const useSocketUserResource = () => {
  useSocketEventGeneric({
    Context: UserSocketContext,
    eventName: SocketNsp.user.events.updateDigitalTwin,
    handler: (data, isMounted) => {
      console.log('Received Digital Twin update event via socket:', data);
      // Only dispatch if component is still mounted
      if (isMounted()) {
        // TODO: change to correct tag that corresponds to resources user has provisioned
        dispatch(statusApi.util.invalidateTags(['appStatus']));

        // Optional: log the received data for debugging
        if (data) {
          console.log('Resource update received:', data);
        }
      }
    }
  });
};

export default useSocketUserResource;
