import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './utils/utility-classes.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Home, Login, Signup, Product, Products, Cart, Page404, About, TermsAndConditions, Checkout } from './pages';
import ProtectedRoute from './utils/ProtectedRoute';

class App extends React.Component {
	render() {
		return (
			<div className='app'>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route path='/login' component={Login} />
					<Route path='/signup' component={Signup} />
					<Route path='/cart' component={Cart} />
					<Route path='/products/' component={Products} />
					<Route path='/product/:productId' component={Product} />
					<Route path='/about/' component={About} />
					<Route path='/terms-and-conditions/' component={TermsAndConditions} />
					<ProtectedRoute exact path='/checkout' component={Checkout} />
					<Route path='*' component={Page404} />
				</Switch>
			</div>
		);
	}
}

export default App;
