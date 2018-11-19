import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Header from './Header';
import SurveyList from './survey/SurveyList';

class Dashboard extends Component {

    componentDidMount() { document.title = 'Emaily - Home'; }

    render() {
        return (
                <div>
                    <Header background="blue" depth={1} />
                    
                    <SurveyList />
                    <div class="fixed-action-btn">
                        <Link 
                            to="/surveys/new" 
                            className="btn__add btn-floating btn-large cyan pulse">
                            <i className="material-icons">add_circle</i>
                        </Link>
                    </div>
                </div>
        );
    }

};

export default Dashboard;
