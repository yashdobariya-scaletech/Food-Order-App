import React, {useContext} from 'react'
import classes from '../Cart/Cart.module.css'
import Modal from '../UI/Modal';
import CartContext from '../../Store/cart-context'
import CartItem from './CartItem'

export default function Cart(props) {
    const Cartconxt = useContext(CartContext)
    
    const totalAmount = `$${Cartconxt.totalAmount.toFixed(2)}`
    const hasItems = Cartconxt.items.length > 0;
    const cartItemRemoveHandler = (id) => {
        Cartconxt.removeItem(id)
    };

    const cartItemAddHandler = (item) => {
        Cartconxt.addItem({...item,amount:1})
    };

    const cartItem = <ul className={classes['cart-items']}>{Cartconxt.items.map(item => 
    <CartItem  key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartItemRemoveHandler.bind(null, item.id)}
    onAdd={cartItemAddHandler.bind(null, item)}/>
        )}</ul>;

    return (
        <Modal onClose={props.onClose}>
            {cartItem}            
            <div className={classes.total}>
                <span>Totle Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button onClick={props.onClose} className={classes['button--alt']}>Close</button>
                {hasItems && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    )
}
