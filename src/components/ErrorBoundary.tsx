import React from 'react';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import GlassCard from './GlassCard';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  handleRefresh = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <GlassCard className="max-w-md border-red-500/30 bg-red-500/5">
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <AlertTriangle className="w-12 h-12 text-red-400" />
              </div>
              
              <div className="text-center">
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  Oops! Something went wrong
                </h1>
                <p className="text-muted-foreground mb-4">
                  We encountered an unexpected error. Please try refreshing the page or go back home.
                </p>
                
                {this.state.error && import.meta.env.DEV && (
                  <div className="mt-4 p-3 bg-background/50 rounded text-left text-sm font-mono text-red-400 overflow-auto max-h-32">
                    <p className="font-bold mb-1">Error Details:</p>
                    <p>{this.state.error.message}</p>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={this.handleRefresh}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-lg text-cyan-400 hover:text-cyan-300 transition font-semibold"
                >
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </button>
                <button
                  onClick={this.handleReset}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-400 hover:text-purple-300 transition font-semibold"
                >
                  <Home className="w-4 h-4" />
                  Go Home
                </button>
              </div>
            </div>
          </GlassCard>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
