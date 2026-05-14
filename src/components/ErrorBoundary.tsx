import React from 'react';
export class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: unknown}> {
  constructor(props: unknown) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error: unknown) { return { hasError: true, error }; }
  componentDidCatch(error: unknown) { console.error(error); }
  render() { if (this.state.hasError) { return <div style={{padding:'50px',background:'red',color:'white',zIndex:9999,position:'absolute',inset:0}}><h1>Error</h1><pre>{this.state.error?.toString()}</pre><pre>{this.state.error?.stack}</pre></div>; } return this.props.children; }
}
