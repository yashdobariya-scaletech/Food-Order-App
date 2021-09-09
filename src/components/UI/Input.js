import React from 'react'
import classes from '../UI/Input.module.css'

export default function Input(props) {
    return (
        <div className={classes.input}>
            <label htmlFor={props.input.id}>{props.lable}</label>
            <input id={props.input.id} {...props.input}/>
        </div>
    )
}
