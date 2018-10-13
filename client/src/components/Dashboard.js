import React, { Component } from 'react';
import Header from './Header';

class Dashboard extends Component {

    componentDidMount() { document.title = 'Emaily - Home'; }

    render() {
        return (
            <div>
                <Header history={this.props.history} background="blue" depth={1} />
            </div>
        );
    }

};

export default Dashboard;
