import React, { Component } from 'react';

import SurveyForm from './SurveyForm';
import Header from '../Header';
import Title from '../Title';
import SurveyPreview from './SurveyPreview';
import EditButton from './EditButton';
import SubmitButton from './SubmitButton';
import ShowEmailList from './ShowEmailList';


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
        preview: false,
        formDone: false
    }

    previewHandler = () => this.setState({ preview: !this.state.preview })

    onFormChange = ({ target: { name, value } }) => {
        const { formData } = this.state;

        this.setState({ formData: { ...formData, [name]: value } });
        this.setState({ formDone: this.isFormDone() ? true : false })
    }

    submitHandler = () => {
        console.log('sdf')
    }

    isFormDone = () => Object.entries(this.state.formData).every(([_, value]) => value.trim() !== '')
    
    render() {
        const { preview, formDone, formData } = this.state;
        const notPreview = !preview;

        return (
            <div>
                <Header background="blue" depth={1} />

                <div className="container">
                    <Title title={preview ? "New Survey - Preview" : "New Survey"} />

                    {preview && <EditButton previewHandler={this.previewHandler} />}

                    {preview ? 
                        <SurveyPreview 
                            {...this.props}
                            onPreview={this.onPreview}
                            data={formData} /> :
                        <SurveyForm 
                            data={formData} 
                            onFormChange={this.onFormChange}/>}

                    {notPreview && 
                        <ShowEmailList 
                            style={{ position: 'relative', top: -45 }}
                            offset='offset-m1'
                            emails={formData.recipientsList.split(',').map(x => x.trim())} />}
                        
                    {formDone && 
                        <SubmitButton 
                            isInPreview={preview} 
                            submitHandler={this.submitHandler} 
                            showPreview={this.previewHandler} />}
                </div>
            </div>
        );
    }
};

export default SurveyNew;