import { Component, ErrorInfo, ReactNode } from 'react';
import View500 from 'sections/maintenance/View500';
import { isNonProd } from 'utils/envUtils';

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

// ==============================|| APP ERROR BOUNDARY ||============================== //
// Catches render errors outside the router (providers, toasts, etc.); route errors are handled by components/ErrorBoundary.
export default class AppErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info.componentStack);
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    // never expose error details or stack traces outside of development
    const isDev = isNonProd();

    if (!isDev) return <View500 />;

    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  }
}
