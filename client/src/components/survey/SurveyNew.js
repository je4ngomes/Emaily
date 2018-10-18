import React, { Component } from 'react';
import { Animated } from 'react-animated-css';

import SurveyForm from './SurveyForm';
import Header from '../Header';
import SurveyPreview from './SurveyPreview';
import SubmitButton from './SubmitButton';

// Todo
// validate form

class SurveyNew extends Component {
    state = {
        formData: {
            surveyTitle: '',
            surveySubject: '',
            surveyBody: '',
            recipientsList: '',
        },
        inPreview: false,
        formDone: false
    }

    previewHandler = () => this.setState({ inPreview: !this.state.inPreview })

    onFormChange = ({ target: { name, value } }) => {
        const { formData } = this.state;

        this.setState({ formData: { ...formData, [name]: value } });
        this.setState({ formDone: this.isFormDone() ? true : false });
    }

    submitHandler = () => {
        console.log('sdf')
    }

    isFormDone = () => Object.entries(this.state.formData).every(([_, value]) => value.trim() !== '')
    
    render() {
        const { inPreview, formDone, formData } = this.state;

        return (
            <div>
                <Header background="blue" depth={1} />

                <div className="container">
                    {inPreview ? 
                        <SurveyPreview 
                            {...this.props}
                            previewHandler={this.previewHandler}
                            data={formData} /> :
                        <SurveyForm 
                            data={formData}
                            onFormChange={this.onFormChange}/>}
                    
                    <Animated animationIn='zoomIn' animationOut='zoomOut' isVisible={formDone}>
                        <SubmitButton 
                            isInPreview={inPreview} 
                            submitHandler={this.submitHandler}
                            showPreview={this.previewHandler} />
                    </Animated>
                </div>
            </div>
        );
    }
};

export default SurveyNew;