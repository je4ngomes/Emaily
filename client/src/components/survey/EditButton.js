import React from 'react';

const EditButton = ({ previewHandler }) => (
    <a style={{
        position: 'absolute', 
        top: 110,
        right: 90,
        cursor: 'pointer'}}
        onClick={previewHandler}
        className="btn-floating btn-medium waves-effect waves-light pulse grey">
        <i className="material-icons">edit</i>
    </a>
);

export default EditButton;
