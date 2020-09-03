import CartActionTypes from '../../types/cart';

const initialState = {
	products: [],
	orderDetails: {}
};

export function cartReducer(state = initialState, action) {
	switch (action.type) {
		case CartActionTypes.ADD_TO_CART:
			let productInCart = false;
			const updatedProducts = state.products.map((product) => {
				if (product.id === action.payload.product.id) {
					productInCart = true;
					return {
						...product,
						quantity: product.quantity + 1
					};
				} else {
					return product;
				}
			});

			if (!productInCart) {
				return Object.assign({}, state, {
					products: [
						...state.products,
						{
							...action.payload.product,
							quantity: 1
						}
					]
				});
			} else {
				return Object.assign({}, state, {
					products: updatedProducts
				});
			}
		case CartActionTypes.REMOVE_FROM_CART:
			const filteredProducts = state.products.filter((product) => {
				return product.id !== action.payload.id;
			});

			return Object.assign({}, state, {
				products: filteredProducts
			});
		case CartActionTypes.ADD_ORDER_DETAILS:
			return Object.assign({}, state, {
				orderDetails: action.payload
			});
		case CartActionTypes.CLEAR_CART:
			return Object.assign({}, state, {
				products: [],
				orderDetails: {}
			});
		default:
			return state;
	}
}
