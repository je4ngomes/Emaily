import React, { Component } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import classNames from 'classnames';

import loginCover from '../media/login_cover.jpg';
import withAuthConsumer from '../contexts/auth/withAuthConsumer';


const OauthOption = ({ label, icon, background, url }) => (
    <div className="row">
        <div className="col s12 m8 offset-m2 ">
                <a href={url} className={"z-depth-1 waves-effect waves-light btn__oauth center " + background}>
                <i className={classNames('fab',
                                { 'fa-google': icon === 'google', 'fa-facebook-f': icon === 'facebook' })}></i>
                    {label}
                </a>
        </div>
    </div>
);

class Login extends Component {

        componentDidMount() { document.title = 'Emaily - Login'; }


    render() {
        const { auth } = this.props;

        if (auth.isAuthenticated)
            return <Redirect to="/surveys" />;

        return (
            <div className="cover" style={{backgroundImage: `url("${loginCover}")`}}>
                <div className="container">
                    <Link to="/" className="brand-logo white-text"><h5>Emaily</h5></Link>
                </div>
                <div style={{position: "relative", top: 120}} className="row">
                    <div style={{padding: 10}} className="col s12 m6 offset-m3 z-depth-3 grey darken-3">
                        <h5 className="center-align white-text">Sign in with</h5>

                        <OauthOption url='/auth/google' label="Login with google" icon="google" background="red"/>
                        <OauthOption url='/auth/facebook' label="Login with facebook" icon="facebook" background="blue"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default withAuthConsumer(withRouter(Login));