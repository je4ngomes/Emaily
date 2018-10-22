import React from 'react';
import { Animated } from 'react-animated-css';

import ShowEmailList from './ShowEmailList';
import EditButton from './EditButton';
import Title from '../Title';


const SurveyPreview = ({ data, previewHandler }) => {
    return (
        <div>
            <Title title="Review">
                <EditButton previewHandler={previewHandler} />
            </Title>

            <Animated animationIn="fadeIn">
                <div className="container">
                    <blockquote className="grey-text text-darken-2">
                        <h5>Survey Title</h5>
                        <p>{data.title}</p>

                        <h5>Survey Subject</h5>
                        <p>{data.subject}</p>

                        <h5>Survey Body</h5>
                        <p className="truncate">{data.body}</p>

                        <h5>Recipients List</h5>
                        <ShowEmailList emails={data.recipients.split(',')}/>
                    </blockquote>
                </div>
            </Animated>
        </div>
    );
};

export default SurveyPreview
