import { useTranslation } from 'react-i18next';
import { useCallback, useRef, useState } from 'react';
import { tokenStorage } from 'utils/tokenUtils';
import { getLang } from 'locales/localeUtils';
import config from 'config';

interface EventStreamProps<bodyType, responseType> {
  url: string;
  body: bodyType;
  onReplyAction: (data: responseType) => void;
}

export const useEventStream = <bodyType, responseType>({ url, body, onReplyAction }: EventStreamProps<bodyType, responseType>) => {
  const { t } = useTranslation();
  const abortControllerRef = useRef<AbortController | null>(null);

  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetStream = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsStreaming(false);
    setError(null);
    console.log('HTTP streaming connection closed');
  }, []);

  const requestStream = useCallback(
    async () => {
      if (isStreaming) return;

      setIsStreaming(true);
      setError(null);

      try {
        // Create new AbortController for this request
        abortControllerRef.current = new AbortController();

        const accessToken = tokenStorage.getAccessToken();
        const requestLang = getLang();

        // Send POST request to start streaming
        const response = await fetch(`${config.baseURL}${url}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
            'portal-user-lang': requestLang
          },
          body: JSON.stringify(body),
          signal: abortControllerRef.current.signal
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Process the stream
        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error('No response body');
        }

        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            setIsStreaming(false);
            break;
          }

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data: any = JSON.parse(line.slice(6));
                // console.log('Received SSE message:', data);

                switch (data.type) {
                  case 'final_result':
                    if (data.data) onReplyAction(data.data);
                    break;

                  case 'stream_complete':
                    setIsStreaming(false);
                    return;

                  case 'error':
                    setError(t('ragChat.ragServerError'));
                    setIsStreaming(false);
                    return;

                  default:
                    // Handle other message types (init, connected, timeout) if needed
                    console.log(`Received ${data.type} message:`, data);
                }
              } catch (e) {
                console.error('Error parsing SSE data:', e);
                setIsStreaming(false);
              }
            }
          }
        }
      } catch (error: any) {
        if (error.name === 'AbortError') {
          console.log('Stream aborted by user');
        } else {
          console.error('Streaming error:', error);
          setError(error.message || 'An error occurred during streaming');
        }
        setIsStreaming(false);
      } finally {
        abortControllerRef.current = null;
        setIsStreaming(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isStreaming]
  );

  return {
    isConnected: true,
    isStreaming,
    error,
    requestStream,
    resetStream
  };
};
