import React from 'react';
import { withRouter } from 'react-router-dom';

import withAuthConsumer from '../contexts/auth/withAuthConsumer';

const LogOut = ({ auth: { logOut }, history }) => (
    <a 
        onClick={() => logOut().then(_ => history.push('/'))}
        className='btn red lighten-1 waves-effect waves-light'>
        Log Out
    </a>
);


export default withRouter(withAuthConsumer(LogOut));

