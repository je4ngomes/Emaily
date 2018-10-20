import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

import '../App.css';
import Login from './Login';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './survey/SurveyNew';
import withAuthProvider from '../contexts/auth/withAuthProvider';
import withAuthConsumer from '../contexts/auth/withAuthConsumer';
import PreLoader from './PreLoader';
import SpinnerLoadPage from '../media/SpinnerLoadPage.svg'; 

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Route 
        {...rest} 
        render={props => 
            auth.loaded 
                ? auth.isAuthenticated ? (<Component {...props} />) : (<Redirect exact to="/login" />)
                : (<PreLoader 
                    classNames='col offset-s5 offset-m5' 
                    style={{position: 'absolute', top: 250, left: 60}} 
                    spinner={SpinnerLoadPage}/>)}>
    </Route>
);

const PublicRoute = ({ component: Component, auth, ...rest }) => (
    <Route 
        {...rest} 
        render={props => 
            auth.loaded 
                ? (<Component {...props} />)
                : (<PreLoader 
                    classNames='col offset-s5 offset-m5' 
                    style={{position: 'absolute', top: 250, left: 60}} 
                    spinner={SpinnerLoadPage}/>)}>
    </Route>
);

class App extends Component {
    
    componentDidMount() {
        this.props.auth.fetchUser(); 
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <PublicRoute path="/" auth={this.props.auth} exact component={Landing}/>
                    <PublicRoute path="/login" auth={this.props.auth} exact component={Login}/>
                    <PrivateRoute path="/surveys" auth={this.props.auth} exact component={Dashboard}/>
                    <PrivateRoute path="/surveys/new" auth={this.props.auth} exact component={SurveyNew}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default withAuthProvider(withAuthConsumer(App));
