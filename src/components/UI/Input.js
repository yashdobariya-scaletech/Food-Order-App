import React from 'react'
import classes from '../UI/Input.module.css'

const Input = React.forwardRef ((props, ref) => {
    return (
        <div className={classes.input}>
            <label htmlFor={props.input.id}>{props.lable}</label>
            <input ref={ref} id={props.input.id} {...props.input}/>
        </div>
    )
});

export default Input;