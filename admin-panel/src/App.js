import React from 'react';
import './App.css';
import 'bulma/css/bulma.css';
import { Switch, Route } from 'react-router-dom';
import withFirebaseAuth from 'react-with-firebase-auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './configs/firebaseConfig';
//pages
import Products from './pages/Products/Products';
import Signin from './pages/auth/Signin';
import Signup from './pages/auth/Signup';

const firebaseApp = firebase.initializeApp(firebaseConfig);

const firebaseAppAuth = firebaseApp.auth();
const providers = {
	googleProvider: new firebase.auth.GoogleAuthProvider()
};

class App extends React.Component {
	constructor() {
		super();
	}

	render() {
		console.log(this.props);
		return (
			<div className='App'>
				<Switch>
					<Route path={'/admin/products'} component={Products} />
					<Route
						path={'/admin/signin'}
						render={(props) => <Signin {...props} signInWithEmailAndPassword={this.props.signInWithEmailAndPassword} />}
					/>
					<Route path={'/admin/signup'} component={Signup} />
				</Switch>
			</div>
		);
	}
}

export default withFirebaseAuth({
	providers,
	firebaseAppAuth
})(App);
