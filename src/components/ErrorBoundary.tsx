import React from 'react';
export class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: any}> {
  constructor(props: any) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error: any) { return { hasError: true, error }; }
  componentDidCatch(error: any) { console.error(error); }
  render() { if (this.state.hasError) { return <div style={{padding:'50px',background:'red',color:'white',zIndex:9999,position:'absolute',inset:0}}><h1>Error</h1><pre>{this.state.error?.toString()}</pre><pre>{this.state.error?.stack}</pre></div>; } return this.props.children; }
}
