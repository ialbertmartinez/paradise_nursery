import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
	const cart = useSelector(state => state.cart.items);
	const dispatch = useDispatch();
	let totalAmount = 0;

	// Calculate total amount for all products in the cart
	const calculateTotalAmount = () => {
		cart.forEach(item => {
			let itemCost = parseInt(item.cost.split('$')[1] || 0);
			totalAmount += itemCost * Number(item.quantity);
		});

		return totalAmount;
	};

	const handleContinueShopping = (e) => {
		onContinueShopping(e);
	};

	const handleCheckoutShopping = (e) => {

      alert('Functionality to be added for future reference');
    };

	const handleIncrement = (item) => {
		dispatch(incrementQuantity(item));
		// dispatch(updateQuantity(item))
	};

	const handleDecrement = (item) => {
		if(item.quantity < 0) {
			dispatch(removeItem(item));
		} else {
			dispatch(decrementQuantity(item));
		}
	};
	

	const handleRemove = (item) => {
		dispatch(removeItem(item));
	};

	// Calculate total cost based on quantity for an item
	const calculateTotalCost = (item) => {
		let totalCost = 0;
		let {cost, quantity} = item;
		// let itemCost = parseInt(cost.split('$')[1] || 0);
		let itemCost = parseFloat(item.cost.substring(1));
		totalCost = itemCost * Number(quantity);
		
		return totalCost;
	};


	return (
		<div className="cart-container">
			<h2 style={{ color: 'black'}}>
				 Total Cart Amount: ${calculateTotalAmount()}
			</h2>
			
			<div>
				{cart.map(item => (
					<div className="cart-item" key={item.name}>
						<img className="cart-item-image" src={item.image} alt={item.name} />
						<div className="cart-item-details">
							<div className="cart-item-name">{item.name}</div>
							<div className="cart-item-cost">{item.cost}</div>
							<div className="cart-item-quantity">
								<button 
									className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item.name)}>-</button>
									<span className="cart-item-quantity-value">{item.quantity}</span>
								<button 
									className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item.name)}>+</button>
							</div>
							<div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
							<button className="cart-item-delete" onClick={() => handleRemove(item.name)}>Delete</button>
						</div>
					</div>
				))}
			</div>
			<div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
			<div className="continue_shopping_btn">
				<button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
				<br />
				<button 
				className="get-started-button1"
				onClick={(e) => handleCheckoutShopping(e)} >Checkout</button>
			</div>
		</div>
	);
};

export default CartItem;