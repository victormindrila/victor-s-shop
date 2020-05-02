import React from 'react';
import './App.css';
import 'bulma/css/bulma.css';
import { Switch, Route } from 'react-router-dom';
//pages
import Products from './pages/Products/Products';
import Signin from './pages/auth/Signin';
import Signup from './pages/auth/Signup';
import { connect } from 'react-redux';
import { getUserData } from './store/actions/user';

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {}

	componentWillUpdate() {}

	render() {
		return (
			<div className='App'>
				<Switch>
					<Route path={'/admin/products'} component={Products} />
					<Route path={'/admin/signin'} component={Signin} />
					<Route path={'/admin/signup'} component={Signup} />
				</Switch>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return state;
}

function mapDispatchToProps(dispatch) {
	return {
		getUserData: () => {
			dispatch(getUserData());
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
