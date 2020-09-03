import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
const { REACT_APP_STRIPE_PUBLISHABLE_KEY } = process.env;

function StripeCheckoutButton({ price, handleSubmit }) {
	const priceForStripe = price * 100;
	const publishableKey = REACT_APP_STRIPE_PUBLISHABLE_KEY;
	const onToken = (token) => {
		handleSubmit(token);
	};

	return (
		<StripeCheckout
			type='button'
			label='Pay Now'
			name={`Victor's shop`}
			description={`Your total is EUR ${price}`}
			amount={priceForStripe}
			currency='EUR'
			panelLabel='Pay Now'
			token={onToken}
			stripeKey={publishableKey}
		/>
	);
}

export default StripeCheckoutButton;
