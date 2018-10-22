import React from 'react';
import classNames from 'classnames';
import { Animated } from 'react-animated-css';

import ShowEmailList from './ShowEmailList';
import Title from '../Title';


const SurveyForm = ({ onFormChange, data, onBlur, errors }) => {
    return (
        <div>
            <Title title="New Survey" />

            <Animated animationIn="fadeIn">
                <div className="row">
                    <form className="col s11 m10 offset-m1">
                        <div className="row">
                            <div className="input-field col s12 m6">
                                <input className={classNames('validate', { 'invalid': errors.title.valid === false })} onChange={onFormChange} onBlur={onBlur} placeholder="Title" name="title" id="title" type="text" value={data.title}/>
                                <label htmlFor="title">Survey Title</label>
                                <span className="helper-text" data-error="Title is required"></span>
                            </div>
                            <div className="input-field col s12 m6">
                                <input className={classNames('validate', { 'invalid': errors.subject.valid === false })} onChange={onFormChange} onBlur={onBlur} placeholder="Subject" id="subject" name="subject" type="text" value={data.subject}/>
                                <label htmlFor="subject">Subject Line</label>
                                <span className="helper-text" data-error="Subject is required"></span>                                
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <textarea className={classNames('materialize-textarea validate', { 'invalid': errors.body.valid === false })} required onChange={onFormChange} onBlur={onBlur} placeholder="Content..." name="body" id="textarea1" value={data.body}></textarea>
                                <label htmlFor="textarea1">Email Body</label>
                                <span className="helper-text" data-error="Body is required"></span>                                
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s12">
                                <input className={classNames('validate', { 'invalid': errors.email.valid === false })} onChange={onFormChange} onBlur={onBlur} placeholder="Recipients" name="recipients" id="recipients" type="text" value={data.recipients}/>
                                <label htmlFor="recipients">Recipients List</label>
                                <span className="helper-text" data-error={`These emails are invalid: ${errors.email.data}`}></span>                                
                            </div>
                        </div>
                    </form>
                </div>
            </Animated>

            <ShowEmailList 
                style={{ position: 'relative', top: -45 }}
                offset='offset-m1'
                emails={data.recipients.split(',').map(x => x.trim())} />
        </div>
    )
}

export default SurveyForm;
