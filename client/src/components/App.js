import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

// components
import Login from './Login';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './SurveyNew';
import withAuthProvider from '../contexts/auth/withAuthProvider';
import withAuthConsumer from '../contexts/auth/withAuthConsumer';
import '../App.css'

class App extends Component {
    
    componentDidMount() {
        this.props.auth.fetchUser(); 
    }

    render() {
        return (
            <BrowserRouter>
                <React.Fragment>
                    <Switch>
                        <Route path="/" exact component={Landing}/>
                        <Route path="/login" exact component={Login}/>
                        <Route path="/surveys" exact component={Dashboard}/>
                        <Route path="/surveys/new" exact component={SurveyNew}/>
                    </Switch>
                </React.Fragment>
            </BrowserRouter>
        );
    }
}

export default withAuthProvider(withAuthConsumer(App));
