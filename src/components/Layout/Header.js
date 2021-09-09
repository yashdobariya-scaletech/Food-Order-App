import React from 'react'
import meals from '../../assets/meals.jpg'
import classes from '../Layout/Header.module.css'
import HeaderCartButton from '../Layout/HeaderCartButton'

export default function Header(props) {
    return (
        <>
            <header className={classes.header}>
                <h1>React Meals</h1>
                <HeaderCartButton onClick={props.onCartShown}/>

            </header>
            <div className={classes['main-image']}>
                <img src={meals}  alt="a meal "></img>
            </div>
        </>
    )
}
