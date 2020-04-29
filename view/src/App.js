import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import './utils/utility-classes.css';
import 'bootstrap/dist/css/bootstrap.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';

class App extends React.Component {
	render() {
		return (
			<div className='app'>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route path='/login' component={Login} />
				</Switch>
			</div>
		);
	}
}

export default App;
