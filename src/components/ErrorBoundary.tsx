import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Scrapbook caught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF7F2] text-[#42352F] flex items-center justify-center p-6 text-center font-sans">
          <div className="max-w-md bg-white border border-[#E9DFD5] rounded-3xl p-8 shadow-lg">
            <span className="text-5xl">🎂</span>
            <h1 className="text-2xl font-bold mt-4 text-[#3B2D26]">Happy Birthday Agatha!</h1>
            <p className="text-sm text-[#7F6B62] mt-2">
              Something took a second to load. Please tap below to reopen your scrapbook!
            </p>
            <button
              type="button"
              onClick={() => {
                try {
                  localStorage.removeItem('agatha_bday_photos_v2');
                } catch {
                  // ignore
                }
                window.location.reload();
              }}
              className="mt-6 px-6 py-3 rounded-full bg-[#E07A8B] hover:bg-[#D46B7D] text-white font-semibold shadow-md transition-all cursor-pointer"
            >
              Reopen Scrapbook ✨
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
