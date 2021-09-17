import React, {useRef, useState} from 'react'
import classes from './CheckOut.module.css'

const isEmpty = value => value.trim() === '';
const isSixChars = value => value.trim().length === 6;

export default function CheckOut(props) {
const [formInputIsValid, setformInputIsValid] = useState({
    name:true,
    street:true,
    city:true,
    postalCode:true,
})

    const nameInputRef = useRef('')
    const streetInputRef = useRef('')
    const postalInputRef = useRef('')
    const cityInputRef = useRef('')

    const confirmHandle = (event) => {
        event.preventDefault();
        console.log("confirm");
    
        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName); 
        const enteredStreetIsValid = !isEmpty(enteredStreet); 
        const enteredCityIsValid = !isEmpty(enteredCity); 
        const enteredPostalCodeIsValid = isSixChars(enteredPostalCode)

        setformInputIsValid({
            name:enteredNameIsValid,
            street:enteredStreetIsValid,
            city:enteredCityIsValid,
            postalCode:enteredPostalCodeIsValid,
        })

        const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalCodeIsValid

        if(!formIsValid){
            return
        }

        props.onConfirm({
            name:enteredName,
            street:enteredStreet,
            city:enteredCity,
            postalCode:enteredPostalCode,
        })
    

    }

    const nameControlClasses = `${classes.control} ${formInputIsValid.name ? '' : classes.invalid}`
    const streetControlClasses = `${classes.control} ${formInputIsValid.street ? '' : classes.invalid}`
    const postalCodeControlClasses = `${classes.control} ${formInputIsValid.postalCode ? '' : classes.invalid}`
    const cityControlClasses = `${classes.control} ${formInputIsValid.city ? '' : classes.invalid}`


    return (
        <form className={classes.form} onSubmit={confirmHandle}>
            <div className={nameControlClasses}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameInputRef} />
                {!formInputIsValid.name && <p>Please enter your name</p>}
            </div>
            <div className={streetControlClasses}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetInputRef} />
                {!formInputIsValid.street && <p>Please enter your street</p>}
            </div>
            <div className={postalCodeControlClasses}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={postalInputRef} />
                {!formInputIsValid.postalCode && <p>Please enter your postalCode</p>}
            </div>
            <div className={cityControlClasses}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityInputRef} />
                {!formInputIsValid.city && <p>Please enter your city</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    )
}
