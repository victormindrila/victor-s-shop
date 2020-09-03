import { createSelector } from 'reselect';

const selectCart = (state) => state.cart;

export const selectCartProducts = createSelector([ selectCart ], (cart) => cart.products);

export const selectOrderDetails = createSelector([ selectCart ], (cart) => cart.orderDetails);

export const selectCartTotal = createSelector([ selectCart ], ({ products }) =>
	products.reduce((acc, product) => {
		return acc + product.quantity * product.price;
	}, 0)
);

export const selectNumberOfProductsInCart = createSelector([ selectCart ], ({ products }) =>
	products.reduce((acc, product) => {
		return acc + product.quantity;
	}, 0)
);
