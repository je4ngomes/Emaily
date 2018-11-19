import React, { Component } from 'react';
import { isEmpty } from 'ramda';
import ReactCardFlip from 'react-card-flip';
import Axios from 'axios';

import Card from './Card';
import SpinnerLoadPage from '../../media/SpinnerLoadPage.svg'; 
import PreLoader from '../PreLoader';
import Chart from './Chart';

class SurveyList extends Component {

    state = {
        surveys: [],
        flipStatus: {}
    }

    componentDidMount() {
        Axios.get('/api/surveys')
            .then(({data: surveys}) => {
                this.setState({ surveys });
                this.setState({ flipStatus: surveys.reduce((acc, curr) => ({ ...acc, [curr._id]: false }), {}) })
            });
    }

    handleClick = (id)  => this.setState({ flipStatus: { ...this.state.flipStatus, [id]: !this.state.flipStatus[id] } })

    renderCards = (surveys) => {
        return (
            <div className="container">
                <div className="row">
                    {surveys.map(({_id: id, ...survey}) => (
                        <div className="col s12 m12 l4">
                            <ReactCardFlip key={id} isFlipped={this.state.flipStatus[id]}>
                                <Card handleClick={this.handleClick.bind(null, id)} key="front" btnLabel='Statistics'>
                                    <span className="card-title surveyTitle">{survey.title}</span>
                                    <hr/>
                                    <p className="truncate">{survey.body}</p>
                                    <p className="right surveyDate">
                                        Sent On: {new Date(survey.dateSent).toLocaleDateString('pt-br')}
                                    </p>
                                </Card>
        
                                <Card handleClick={this.handleClick.bind(null, id)} key="back" btnLabel='Back'>
                                    <Chart data={[
                                            {id: "no",
                                            label: "No",
                                            value: survey.no,
                                            color: "red"},
                                            {id: "yes",
                                            label: "Yes",
                                            value: survey.yes,
                                            color: "green"}]} />
                                </Card>
                            </ReactCardFlip>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    render() {
        const { surveys } = this.state;

        return isEmpty(surveys) 
                    ? <PreLoader 
                        spinner={SpinnerLoadPage} 
                        classNames='col offset-s2 offset-m5'/>
                    : this.renderCards(surveys);
    }
}

export default SurveyList;