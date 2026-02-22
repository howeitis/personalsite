import { Component } from 'react';

export class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '8rem 2rem', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <h1 className="serif-text" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', marginBottom: '1rem' }}>
                        Something went wrong.
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                        Try refreshing the page.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="pill-tag bg-terracotta"
                        style={{ color: 'white', border: 'var(--border-thick)', cursor: 'pointer', fontSize: '1.1rem', padding: '0.75rem 1.5rem' }}
                    >
                        Refresh
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
