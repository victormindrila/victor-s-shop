export function addToCart(payload) {
	return {
		type: 'ADD_TO_CART',
		payload
	};
}

export function removeFromCart(payload) {
	return {
		type: 'REMOVE_FROM_CART',
		payload
	};
}

export function addOrderDetails(payload) {
	return {
		type: 'ADD_ORDER_DETAILS',
		payload
	};
}

export function clearCart() {
	return {
		type: 'CLEAR_CART'
	};
}
