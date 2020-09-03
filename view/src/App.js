import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import './utils/utility-classes.css';
import 'bootstrap/dist/css/bootstrap.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Products from './pages/Products/Products';
import Product from './pages/Product/Product';
import Cart from './pages/Cart/Cart';
import Page404 from './pages/Page404/Page404';
import About from './pages/About/About';
import TermsAndConditions from './pages/TermsAndConditions/TermsAndConditions';
import Checkout from './pages/Checkout/Checkout';
import ProtectedRoute from './utils/ProtectedRoute';

class App extends React.Component {
	render() {
		return (
			<div className='app'>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route path='/login' component={Login} />
					<Route path='/signup' component={SignUp} />
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
