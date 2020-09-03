import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// components
import Layout from '../../components/Layout/Layout';
import CartIsEmpty from '../../components/CartIsEmpty/CartIsEmpty';
import CartList from '../../components/CartList/CartList';

//actions
import { removeFromCart } from '../../store/actions/cart';

//selectors
import { selectCartProducts, selectCartTotal } from '../../store/selectors/cart';

//styles
import './Cart.css';

function Cart({ products, removeFromCart, history, total }) {
	return (
		<Layout title='Cart'>
			<div className='cart-page container-fluid container-min-max-width
				d-flex flex-column justify-content-center align-items-center'>
				{products.length ? (
					<CartList goBack={history.goBack} products={products} removeFromCart={removeFromCart} total={total} />
				) : (
					<CartIsEmpty />
				)}
			</div>
		</Layout>
	);
}

const mapStateToProps = createStructuredSelector({
	products: selectCartProducts,
	total: selectCartTotal
});

function mapDispatchToProps(dispatch) {
	return {
		removeFromCart: (payload) => dispatch(removeFromCart(payload))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
