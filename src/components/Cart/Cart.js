import React from 'react'
import classes from '../Cart/Cart.module.css'
import Modal from '../UI/Modal';

export default function Cart(props) {
    const cartItem = <ul className={classes['cart-items']}>{[{
        id:"m1",
        name: "sushi",
        amount:'2',
        price:'15.99',

    },].map(item => <li>{item.name}</li>)}</ul>;

    return (
        <Modal onClose={props.onClose}>
            {cartItem}            
            <div className={classes.total}>
                <span>Totle Amount</span>
                <span>55.33</span>
            </div>
            <div className={classes.actions}>
                <button onClick={props.onClose} className={classes['button--alt']}>Close</button>
                <button className={classes.button}>Order</button>
            </div>
        </Modal>
    )
}
