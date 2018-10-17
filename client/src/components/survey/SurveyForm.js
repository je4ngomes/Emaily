import React from 'react';

const SurveyForm = ({ onFormChange, data, onBlur }) => {
    return (
        <div className="row">
            <form className="col m10 offset-m1">
                <div className="row">
                    <div className="input-field col s12 m6">
                        <input onChange={onFormChange} onBlur={onBlur} placeholder="Title" name="surveyTitle" id="title" type="text" value={data.surveyTitle}/>
                        <label htmlFor="title">Survey Title</label>
                    </div>
                    <div className="input-field col s12 m6">
                        <input onChange={onFormChange} onBlur={onBlur} placeholder="Subject" id="subject" name="surveySubject" type="text" value={data.surveySubject}/>
                        <label htmlFor="subject">Subject Line</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <textarea onChange={onFormChange} onBlur={onBlur} placeholder="Content..." name="surveyBody" id="textarea1" className="materialize-textarea" value={data.surveyBody}></textarea>
                        <label htmlFor="textarea1">Email Body</label>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s12">
                        <input onChange={onFormChange} onBlur={onBlur} placeholder="Recipients" name="recipientsList" id="recipients" type="text" value={data.recipientsList}/>
                        <label htmlFor="recipients">Recipients List</label>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SurveyForm;
