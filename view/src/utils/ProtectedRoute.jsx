import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { isAuthenticated } from '../store/selectors/user';

function ProtectedRoute({ component: Component, isAuthenticated, ...rest }) {
	return (
		<Route
			{...rest}
			render={(props) =>
				isAuthenticated ? (
					<Component {...props} />
				) : (
					<Redirect to={{ pathname: '/login', state: { from: props.location } }} />
				)}
		/>
	);
}

const mapStateToProps = createStructuredSelector({
	isAuthenticated: isAuthenticated
});

export default connect(mapStateToProps)(ProtectedRoute);
