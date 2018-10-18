import React from 'react';

const PreLoader = ({ spinner, style, classNames }) => (
    <div className='row'>
        <div className={classNames} style={style}> <img src={spinner} alt=""></img> </div>
    </div>
);

export default PreLoader;
