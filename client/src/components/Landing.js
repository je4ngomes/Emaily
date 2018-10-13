import React, { Component } from 'react';
import Header from './Header';
import cover from '../media/cover.jpg';

class Landing extends Component {

    render() {
        return (
            <div>
                <section style={{backgroundImage: `url("${cover}")`}} className="cover">
                    <Header history={this.props.history} background="transparent" txtColor="blue"/> 

                    <div className="message-cover">
                        <h3 className="blue-text">Create and send Surveys,{" "}
                            <span className="red-text">easy</span> and{" "}
                            <span className="red-text">fast.</span>
                        </h3>
                    </div>
                </section>
            </div>
        )
    }
}


export default Landing;
