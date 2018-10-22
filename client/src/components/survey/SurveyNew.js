import React, { Component } from 'react';
import * as R from 'ramda';
import { Link } from 'react-router-dom';

import SurveyForm from './SurveyForm';
import Header from '../Header';
import SurveyReview from './SurveyReview';
import SubmitButton from './SubmitButton';
import validate from './validation';
import Axios from 'axios';
import withAuthConsumer from '../../contexts/auth/withAuthConsumer';

// Todo
// validate form

class SurveyNew extends Component {
    state = {
        formData: {
            title: 'asdsadsd',
            subject: 'dfsdfdf',
            body: 'sdfdsf',
            recipients: 'cyraxtsung@gmail.com'
        },
        errors: {
            title: '',
            subject: '',
            body: '',
            email: ''
        },
        inPreview: false
    }

    componentDidMount() { document.title = 'Emaily - New Survey'; }

    previewHandler = () => this.setState({ inPreview: !this.state.inPreview })

    onFormChange = ({ target: { name, value } }) => {
        const { formData } = this.state;

        this.setState({ formData: { ...formData, [name]: value } });
    }

    onBlur = ({ target: { name, value } }) => {
        const type = name === 'recipientsList' ? 'email': name;
        this.setState({ errors: { ...this.state.errors, [type]: validate({ type, value }) } });
    }

    submitHandler = () => {
        const { errors, formData } = this.state;
        const { auth: { fetchUser }, history } = this.props;

        const notValid = Object.entries(errors).some(([_, value]) => value.valid === false);
       
        if (notValid)
            return this.setState({ inPreview: false });

        Axios.post('/api/surveys', formData)
            .then(res => {
                console.log(res);
                fetchUser(res.data);
                history.push('/surveys');
            })
            .catch(err => console.error(err))
        
    }
    
    render() {
        const { inPreview, formData, errors } = this.state;

        return (
            <div>
                <Header background="blue" depth={1} />

                <div className="container">
                    {inPreview ? 
                        <SurveyReview 
                            {...this.props}
                            previewHandler={this.previewHandler}
                            data={formData} /> :
                        <SurveyForm 
                            data={formData}
                            errors={errors}
                            onBlur={this.onBlur}
                            onFormChange={this.onFormChange}/>}
                    
                    <div className='row'>
                        <div className="col s2 m2 offset-m4">
                            <Link to='/surveys' className='btn-floating btn-large waves-effect waves-light red'>
                                <i className="material-icons left">cancel</i> 
                            </Link>
                        </div>
                        
                        <div className="col s2 offset-s6 m2 offset-m1">
                            <SubmitButton 
                                isInPreview={inPreview} 
                                submitHandler={this.submitHandler}
                                showPreview={this.previewHandler} />
                        </div>
                    </div>


                </div>
            </div>
        );
    }
};

export default withAuthConsumer(SurveyNew);