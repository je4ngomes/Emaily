import React from 'react';

const SubmitButton = ({ isInPreview, showPreview, submitHandler }) => (
    <div className="row">
        <div className="col offset-m11 offset-s8 right-align">
            <a
                onClick={isInPreview ? submitHandler : showPreview}
                className="btn-floating btn-large waves-effect waves-light light-blue accent-3">
                <i className="material-icons">send</i>
            </a>
        </div>
    </div>
);

export default SubmitButton;
