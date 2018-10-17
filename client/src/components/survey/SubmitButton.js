import React from 'react';

const SubmitButton = ({ isInPreview, showPreview, submitHandler }) => (
    <a style={{
        position: 'absolute', 
        bottom: 20,
        right: 50,
        cursor: 'pointer'}}
        onClick={isInPreview ? submitHandler : showPreview}
        className="btn-floating btn-large waves-effect waves-light light-blue accent-3">
        <i className="material-icons">send</i>
    </a>
);

export default SubmitButton;
