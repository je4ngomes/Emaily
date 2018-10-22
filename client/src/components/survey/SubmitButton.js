import React from 'react';

const SubmitButton = ({ isInPreview, showPreview, submitHandler }) => (
    <a
        onClick={isInPreview ? submitHandler : showPreview}
        className="btn-floating btn-large pulse waves-effect waves-light light-blue accent-3">
        <i className="material-icons left">{isInPreview ? 'email' : 'send'}</i>
    </a>
);

export default SubmitButton;
