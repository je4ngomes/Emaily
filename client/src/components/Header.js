import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import withAuthConsumer from '../contexts/auth/withAuthConsumer';
import Preloader from './PreLoader';
import Payments from './Payments';
import SpinnerHeader from '../media/SpinnerHeader.svg';


class Header extends Component {

    loginStatus() {
        const { auth, txtColor = 'white' } = this.props;

        return auth.loaded 
            ? auth.isAuthenticated 
                ? [
                    <li key="0"><Payments /></li>,
                    <li key="1"><a style={{cursor: 'default'}} className='btn light-blue accent-3'>Credits {auth.user.credits}</a></li>,
                    <li key="2"><a href='/auth/logout' className='btn red lighten-1 waves-effect waves-light'>Log Out</a></li>
                 ] 
                : (<li><a href='/auth/google' className={`${txtColor}-text`}>Login</a></li>) 
            : (<Preloader spinner={SpinnerHeader} />);
    }

    render() {
        const { background, txtColor='white', auth, depth = 0 } = this.props;

        return (
            <nav style={{ marginBottom: 30 }} className={`${background} z-depth-${depth}`}>
                <div className="nav-wrapper navbar">
                    <Link to={auth.isAuthenticated ? '/surveys' : '/'} className={`brand-logo ${txtColor}-text`}>Emaily</Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        {this.loginStatus()}
                    </ul>
                </div>
            </nav>            
        );
    }
}

export default withAuthConsumer(Header);
