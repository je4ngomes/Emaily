import React, { Component } from 'react'

class Title extends Component {
  render() {
    return (
        <div style={{marginBottom: 20}}>
            <h5 style={{fontWeight: 'bold'}}>{this.props.title}</h5>
            <hr/>
        </div>
    )
  }
}

export default Title;