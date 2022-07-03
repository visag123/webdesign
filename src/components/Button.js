import React from 'react';
import "./Button.js"

const Button = (props) => {
    const {type,className,onClick} =props
  return (
    <div className='button_js'>
    <button type={type} className={className} onClick={onClick}>{props.children} </button>
    </div>
  )
}

export default Button