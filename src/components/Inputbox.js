import React from 'react';
import "./Input.css";

const Inputbox = (props) => {
    const{type,id,className,placeholder,label,name,value,onChange,disabled} =props
  return (
    <div className='input_js'>
        <label htmlFor={id} >{label}</label>
        <input type={type} id={id} placeholder={placeholder} className={className} label={label} name={name} value={value} onChange={onChange} required autoComplete="off" disabled ={disabled} />
    </div>
  )
}

export default Inputbox;