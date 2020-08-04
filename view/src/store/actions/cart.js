import CartActionTypes from '../types/cart';

export function addToCart(payload) {
	return {
		type: CartActionTypes.ADD_TO_CART,
		payload
	};
}

export function removeFromCart(payload) {
	return {
		type: CartActionTypes.REMOVE_FROM_CART,
		payload
	};
}

export function addOrderDetails(payload) {
	return {
		type: CartActionTypes.ADD_ORDER_DETAILS,
		payload
	};
}

export function clearCart() {
	return {
		type: CartActionTypes.CLEAR_CART
	};
}
