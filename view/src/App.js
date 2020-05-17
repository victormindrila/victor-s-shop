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

class App extends React.Component {
	render() {
		return (
			<div className='app'>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route path='/login' component={Login} />
					<Route path='/signup' component={SignUp} />
					<Route path='/products/' component={Products} />
					<Route path='/product/:productId' component={Product} />
				</Switch>
			</div>
		);
	}
}

export default App;
