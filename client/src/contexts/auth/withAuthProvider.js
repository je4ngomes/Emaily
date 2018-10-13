import React, { Component } from 'react';
import AuthProvider from './AuthContext';

const withAuthProvider = (WrappedComponent) => {
    return class extends Component {
        render() {
            return (
                <AuthProvider>
                    <WrappedComponent {...this.props} />
                </AuthProvider>
            );
        }
    };
};

export default withAuthProvider;