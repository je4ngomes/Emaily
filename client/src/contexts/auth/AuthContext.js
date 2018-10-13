import React, { Component } from 'react';
import Axios from 'axios';

const Context = React.createContext();

const reducer = (state, action) => {
    switch (action.type) {

        case 'FETCH_USER': 
            return { user: action.payload || false };

        case 'LOG_OUT':
            return { user: null };

        default: return state;
    }
};

class AuthProviter extends Component {
    state = {
        user: null
    }

    dispatch = (action) => this.setState(state => reducer(state, action))

    dispatchAction = ({ data }) => this.dispatch({ type: 'FETCH_USER', payload: data })

    fetchUser = () => {
        Axios
            .get('/api/current_user')
            .then(this.dispatchAction);
    }

    handleStripeToken = (token) => {
        Axios
            .post('/api/stripe', token)
            .then(this.dispatchAction)
    }

    render() {
        return (
            <Context.Provider value={{
                                        user: this.state.user, 
                                        fetchUser: this.fetchUser,
                                        handleStripeToken: this.handleStripeToken
                                    }}>
                {this.props.children}
            </Context.Provider>
        );
    }
}

export default AuthProviter;
export const Consumer = Context.Consumer;