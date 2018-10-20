import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

class Dashboard extends Component {

    componentDidMount() { document.title = 'Emaily - Home'; }

    render() {
        return (
            <div>
                <Header background="blue" depth={1} />
                
                <Link style={{
                    position: 'absolute', 
                    bottom: 20,
                    right: 20,
                    cursor: 'pointer'}} 
                    to="/surveys/new" 
                    className="btn__add btn-floating btn-large cyan pulse">
                    <i className="material-icons">add_circle</i>
                </Link>
            </div>
        );
    }

};

export default Dashboard;
