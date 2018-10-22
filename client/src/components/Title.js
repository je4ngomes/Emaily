import React from 'react';
import { Animated } from 'react-animated-css';

const Title = (props) => (
    <div style={{marginBottom: 20}}>
        <Animated animationIn={"fadeIn"}>
            <h5 className="grey-text text-darken-2" style={{fontWeight: 'bold'}}>{props.title}</h5>
        </Animated>
        <hr/>
        {/* Optional Btn */}
        { props.children }
    </div>
);

export default Title;