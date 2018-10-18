import React, { Component } from 'react';
import { Consumer } from './AuthContext';

const withAuthConsumer = (WrappedComponent) => {
    return class extends Component {
        render() {
            return (
                <Consumer>
                    {value => (
                        <WrappedComponent 
                            {...this.props} 
                            auth={value}/>
                    )}
                </Consumer>
            );
        }
    };
};

export default withAuthConsumer;