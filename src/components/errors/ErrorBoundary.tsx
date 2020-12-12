import { Component, ErrorInfo, ReactNode } from 'react';

type CommonProps = {
  onError?: (error: Error, info: ErrorInfo) => void;
  onReset?: (...args: unknown[]) => void;
};

type RenderFallbackProps = {
  error: Error;
  reset: (...args: unknown[]) => void;
};

type FallbackProps =
  | {
      fallback: ReactNode;
      renderFallback?: never;
    }
  | {
      fallback?: never;
      renderFallback: (props: RenderFallbackProps) => ReactNode;
    };

type Props = CommonProps & FallbackProps;

interface State {
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = {};

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onError?.(error, info);
  }

  reset = (...args: unknown[]) => {
    this.props.onReset?.(...args);
    this.setState({ error: undefined });
  };

  render() {
    const { children, fallback, renderFallback } = this.props;
    const { error } = this.state;

    if (error != null) {
      if (renderFallback != null) {
        return renderFallback({ error, reset: this.reset });
      }

      return fallback;
    }

    return children;
  }
}
