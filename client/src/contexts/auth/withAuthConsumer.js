import React, { Component } from 'react';
import { Consumer } from './AuthContext';

const withAuthConsumer = (WrappedComponent) => {
    return class extends Component {
        render() {
            return (
                <Consumer>
                    {auth => (
                        <WrappedComponent 
                            {...this.props} 
                            auth={auth}/>
                    )}
                </Consumer>
            );
        }
    };
};

export default withAuthConsumer;