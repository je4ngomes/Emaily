import React, { Component } from 'react';
import Axios from 'axios';

const Context = React.createContext();

const reducer = (state, action) => {
    switch (action.type) {

        case 'FETCH_USER': 
            return {
                user: { ...action.payload.user },
                isAuthenticated: action.payload.auth,
                loaded: true
            };

        case 'LOG_OUT':
            return {
                user: {},
                isAuthenticated: false,
                loaded: true
            };

        default: return state;
    }
};

class AuthProviter extends Component {
    state = {
        user: {
            OauthID: null,
            credits: null
        },
        isAuthenticated: false,
        loaded: false
    }

    dispatch = (action) => this.setState(state => reducer(state, action))

    dispatchAction = ({ data }) => this.dispatch({ type: 'FETCH_USER', payload: data })

    fetchUser = () => {
        Axios
            .get('/api/current_user')
            .then(this.dispatchAction);
    }

    logOut = () => 
        Axios
            .get('/auth/logout')
            .then(_ => this.dispatch({ type: 'LOG_OUT' }))

    handleStripeToken = (token) => {
        Axios
            .post('/api/stripe', token)
            .then(this.dispatchAction)
    }

    render() {
        const auth = {
            ...this.state,
            fetchUser: this.fetchUser,
            logOut: this.logOut,
            handleStripeToken: this.handleStripeToken
        };

        return (
            <Context.Provider value={auth}>
                {this.props.children}
            </Context.Provider>
        );
    }
}

export default AuthProviter;
export const Consumer = Context.Consumer;