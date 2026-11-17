import { useEventStream } from './useEventStream';

export interface UseEventStreamAdapterProps<bodyType, responseType> {
  url: string;
  body: bodyType;
  onReplyAction: (data: responseType) => void;
}

interface UseEventStreamAdapterReturn {
  isStreaming: boolean;
  error: string | null;
  isConnected?: boolean;
  requestStream: () => void;
  resetStream: () => void;
}

export const useEventStreamAdapter = <bodyType, responseType>({
  url,
  body,
  onReplyAction
}: UseEventStreamAdapterProps<bodyType, responseType>): UseEventStreamAdapterReturn => {
  const httpAdapter = useEventStream<bodyType, responseType>({ url: url, body: body, onReplyAction: onReplyAction });

  return {
    isStreaming: httpAdapter.isStreaming,
    error: httpAdapter.error,
    isConnected: true,
    requestStream: httpAdapter.requestStream,
    resetStream: httpAdapter.resetStream
  } as UseEventStreamAdapterReturn;
};
