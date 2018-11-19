import React from 'react'

const Card = ({ btnLabel, handleClick, ...props }) => {
  return (
    
        <div className="card grey lighten-3">
            <div className="card-content">
                <div className="card-title">
                    {props.children}
                </div>
            </div>
            <div className="card-action">
                <button className="waves-effect waves-light blue btn" onClick={handleClick}>{btnLabel}</button>
            </div>
        </div>

  )
}

export default Card;
