import React from 'react';

import ShowEmailList from './ShowEmailList';

const SurveyPreview = ({ data }) => {
    return (
        <div className="container">
            <blockquote className="grey-text darken-3">
                <h5>Survey Title</h5>
                <p>{data.surveyTitle}</p>

                <h5>Survey Subject</h5>
                <p>{data.surveySubject}</p>

                <h5>Survey Body</h5>
                <p className="truncate">{data.surveyBody}</p>

                <h5>Recipients List</h5>
                <ShowEmailList emails={data.recipientsList.split(',')}/>
            </blockquote>
        </div>
    );
};

export default SurveyPreview
