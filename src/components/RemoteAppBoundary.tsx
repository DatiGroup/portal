import { Component, ErrorInfo, ReactNode, Suspense, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Collapse, Stack, Typography } from '@mui/material';
import { Iconify } from './Iconify';
import Loader from './Loader';

// ==============================|| REMOTE APP FALLBACK ||============================== //

interface FallbackProps {
  name: string;
  error: Error;
}

function RemoteAppUnavailable({ name, error }: FallbackProps) {
  const { t } = useTranslation();
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Stack sx={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 2 }}>
      <Iconify icon="material-symbols:cloud-off-outline" width={64} sx={{ color: 'warning.main' }} />
      <Typography variant="h4">{t('remoteApp.unavailableTitle', { name })}</Typography>
      <Typography color="text.secondary" sx={{ maxWidth: 520 }}>
        {t('remoteApp.unavailableDescription')}
      </Typography>

      <Stack direction="row" sx={{ gap: 1, mt: 1 }}>
        {/* A failed module import is cached by the browser, so a full reload is the reliable way to retry. */}
        <Button variant="contained" onClick={() => window.location.reload()}>
          {t('remoteApp.retry')}
        </Button>
        <Button variant="text" color="secondary" onClick={() => setShowDetails((v) => !v)}>
          {t('remoteApp.technicalDetails')}
        </Button>
      </Stack>

      <Collapse in={showDetails} sx={{ width: '100%', maxWidth: 640 }}>
        <Box
          component="pre"
          sx={{
            m: 0,
            p: 2,
            borderRadius: 1,
            bgcolor: 'action.hover',
            fontSize: 12,
            textAlign: 'left',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word'
          }}
        >
          {error.message}
        </Box>
      </Collapse>
    </Stack>
  );
}

// ==============================|| REMOTE APP BOUNDARY ||============================== //

interface Props {
  /** Human-readable module name shown to the user, e.g. "Digital Twins". */
  name: string;
  children: ReactNode;
}

interface State {
  error: Error | null;
}

/**
 * Wraps a lazily loaded Module Federation remote. Shows a loader while the remote loads and a
 * friendly "unavailable" screen (instead of the route-level stack trace) if it fails to load or crashes.
 */
export class RemoteAppBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`[RemoteAppBoundary] "${this.props.name}" failed to load`, error, info.componentStack);
  }

  render() {
    const { error } = this.state;
    const { name, children } = this.props;

    if (error) return <RemoteAppUnavailable name={name} error={error} />;

    return <Suspense fallback={<Loader />}>{children}</Suspense>;
  }
}
