import React, { Component } from 'react';
import Axios from 'axios';

const Context = React.createContext();

const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {

        case 'FETCH_USER': 
            return { ...state, user: action.payload };

        default: return { ...state };
    }
};

class authProviter extends Component {
    state = {
        user: {}
    }

    dispatch = (action) => this.setState(state => reducer(state, action))

    fetchUser = () => {
        Axios
            .get('/api/current_user')
            .then(({ data }) => this.dispatch({ type: 'FETCH_USER', payload: data }));
    }

    render() {
        return (
            <Context.Provider value={{state: this.state, fetchUser: this.fetchUser}}>
                {this.props.children}
            </Context.Provider>
        );
    }
}

export default authProviter;
export const Consumer = Context.Consumer;