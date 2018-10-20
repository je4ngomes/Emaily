import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import M from 'materialize-css';


import withAuthConsumer from '../contexts/auth/withAuthConsumer';
import Payments from './Payments';
import LogOut from './LogOut';

class Header extends Component {

    componentDidMount() {
        M.Sidenav.init(document.querySelector('.sidenav'));
    }

    componentWillUnmount() {
        M.Sidenav.init(document.querySelector('.sidenav')).close();

    }

    loginStatus() {
        const { auth } = this.props;

        return auth.isAuthenticated 
                ? [
                    <li style={{marginLeft: 10}} key="0"><Payments /></li>,
                    <li key="1"><a style={{cursor: 'default'}} className='btn light-blue accent-3'>Credits {auth.user.credits}</a></li>,
                    <li key="2"><LogOut /></li>
                 ] 
                : (<li><Link to='/login' className={`btn light-blue accent-3 white-text`}>Login</Link></li>) 
    }

    render() {
        const { background, txtColor='white', auth, depth = 0 } = this.props;
        const menu = this.loginStatus();

        return (
            <div>
                <nav style={{ marginBottom: 30, position: 'absolute', zIndex:1 }} className={`${background} z-depth-${depth}`}>
                    <div className="nav-wrapper navbar">
                        <Link to={auth.isAuthenticated ? '/surveys' : '/'} className={`brand-logo ${txtColor}-text`}>Emaily</Link>
                        <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className={`material-icons ${txtColor}-text`}>menu</i></a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            {menu}
                        </ul>
                    </div>
                </nav>

                 <ul className="sidenav" id="mobile-demo">
                    {menu}
                </ul>
            </div>
        );
    }
}

export default withAuthConsumer(Header);
