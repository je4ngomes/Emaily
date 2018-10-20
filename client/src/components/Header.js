import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import withAuthConsumer from '../contexts/auth/withAuthConsumer';
import Payments from './Payments';
import LogOut from './LogOut';

class Header extends Component {

    loginStatus() {
        const { auth, txtColor = 'white' } = this.props;

        return auth.isAuthenticated 
                ? [
                    <li key="0"><Payments /></li>,
                    <li key="1"><a style={{cursor: 'default'}} className='btn light-blue accent-3'>Credits {auth.user.credits}</a></li>,
                    <li key="2"><LogOut /></li>
                 ] 
                : (<li><Link to='/login' className={`${txtColor}-text`}>Login</Link></li>) 
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
