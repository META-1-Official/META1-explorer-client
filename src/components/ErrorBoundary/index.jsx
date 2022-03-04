import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: undefined,
      errorInfo: undefined,
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({error, errorInfo});
  }

  render() {
    const {error, errorInfo} = this.state;

    if (errorInfo) {
      const errorDetails =
        process.env.NODE_ENV === 'development' ? (
          <details>
            {error && error.toString()}
            <br />
            {errorInfo.componentStack}
          </details>
        ) : undefined;

      return (
        <div>
          <h2>An unexpected error has occurred.</h2>
          {errorDetails}
        </div>
      );
    }

    return this.props.children;
  }
}
