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
import NewProduct from './pages/Products/NewProduct';
import EditProduct from './pages/Products/EditProduct';
import ViewProduct from './pages/Products/ViewProduct';
import NewCategory from './pages/Categories/NewCategory';
import Categories from './pages/Categories/Categories';
import EditCategory from './pages/Categories/EditCategory';
import ViewCategory from './pages/Categories/ViewCategory';
import Users from './pages/Users/Users';
import ViewUser from './pages/Users/ViewUser';
import Home from './pages/Home/Home';
import Page404 from './pages/Page404/Page404';

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const { getUserData } = this.props;
		if (localStorage.getItem('Authorization')) {
			getUserData();
		}
	}

	render() {
		return (
			<div className='App'>
				<Switch>
					<Route exact path={'/admin/'} component={Home} />
					<Route exact path={'/admin/signin'} component={Signin} />
					<Route exact path={'/admin/signup'} component={Signup} />

					<Route exact path={'/admin/products/'} component={Products} />
					<Route exact path={'/admin/products/new'} component={NewProduct} />
					<Route exact path={'/admin/products/edit/:productId'} component={EditProduct} />
					<Route exact path={'/admin/products/view/:productId'} component={ViewProduct} />

					<Route exact path={'/admin/categories/new'} component={NewCategory} />
					<Route exact path={'/admin/categories/'} component={Categories} />
					<Route exact path={'/admin/categories/edit/:categoryId'} component={EditCategory} />
					<Route exact path={'/admin/categories/view/:categoryId'} component={ViewCategory} />

					<Route exact path={'/admin/users/'} component={Users} />
					<Route exact path={'/admin/users/view/:userId'} component={ViewUser} />

					<Route exact path={'*'} component={Page404} />
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
