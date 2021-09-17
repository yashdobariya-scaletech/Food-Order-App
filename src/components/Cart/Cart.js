import React, {useContext, useState} from 'react'
import classes from '../Cart/Cart.module.css'
import Modal from '../UI/Modal';
import CartContext from '../../Store/cart-context'
import CartItem from './CartItem'
import CheckOut from './CheckOut';

export default function Cart(props) {
    const [isCheckOut, setisCheckOut] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [didSumit, setDidSumit] = useState(false)

    const Cartconxt = useContext(CartContext)
    
    const totalAmount = `$${Cartconxt.totalAmount.toFixed(2)}`
    const hasItems = Cartconxt.items.length > 0;

    const cartItemRemoveHandler = (id) => {
        Cartconxt.removeItem(id)
    };

    const cartItemAddHandler = (item) => {
        Cartconxt.addItem({...item,amount:1})
    };

    const orderhandle = () => {
        setisCheckOut(true)
    }

    const submitOrderHandle = async userData => {
        setIsSubmitting(true);
        await fetch('https://react-http-9d51f-default-rtdb.firebaseio.com/orders.json',{
            method:'POST',
            body: JSON.stringify({
                user:userData,
                orderedItems:Cartconxt.items
            })
        })
        setIsSubmitting(false);
        setDidSumit(true);
        Cartconxt.clearCart()
    }


    const cartItem = <ul className={classes['cart-items']}>{Cartconxt.items.map(item => 
    <CartItem  key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartItemRemoveHandler.bind(null, item.id)}
    onAdd={cartItemAddHandler.bind(null, item)}/>
        )}</ul>;
    
    const modelAction = <div className={classes.actions}>
    <button onClick={props.onClose} className={classes['button--alt']}>Close</button>
    {hasItems && <button className={classes.button} onClick={orderhandle}>Order</button>}
    </div>

    const cartModelContent = <>{cartItem}            
            <div className={classes.total}>
                <span>Totle Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckOut && <CheckOut onConfirm={submitOrderHandle} onCancel={props.onClose} />}
            {!isCheckOut && modelAction}
            </>

    const isSubmittingModalContent = <p>Sending order data...</p>

    const didSubmitModalContent = <> 
    <p>Successfully sent order!</p>
    <div className={classes.actions}>
    <button onClick={props.onClose} className={classes.button}>Close</button>
    </div>
    </>

    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSumit && cartModelContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSumit && didSubmitModalContent}
        </Modal>
    )
}
