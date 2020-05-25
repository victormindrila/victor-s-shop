import React from 'react';
import './App.css';
import 'bulma/css/bulma.css';
import { Switch, Route, Redirect } from 'react-router-dom';

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
import Orders from './pages/Orders/Orders';
import ViewOrder from './pages/Orders/ViewOrder';

class App extends React.Component {
	componentDidMount() {
		const { getUserData } = this.props;
		if (localStorage.getItem('Authorization')) {
			getUserData();
		}
	}

	render() {
		const { state } = this.props;
		const isLoggedIn = state.user.data;
		return (
			<div className='App'>
				<Switch>
					<Route exact path={'/admin/signin'} component={Signin} />
					<Route exact path={'/admin/signup'} component={Signup} />
					<Route exact path={'/admin/'}>
						{!isLoggedIn ? <Redirect to='/admin/signin' /> : <Home />}
					</Route>
					<Route exact path={'/admin/products/'}>
						{!isLoggedIn ? <Redirect to='/admin/signin' /> : <Products />}
					</Route>
					<Route exact path={'/admin/products/new'}>
						{!isLoggedIn ? <Redirect to='/admin/signin' /> : <NewProduct />}
					</Route>
					<Route exact path={'/admin/products/edit/:productId'}>
						{!isLoggedIn ? <Redirect to='/admin/signin' /> : <EditProduct />}
					</Route>
					<Route exact path={'/admin/products/view/:productId'}>
						{!isLoggedIn ? <Redirect to='/admin/signin' /> : <ViewProduct />}
					</Route>
					<Route exact path={'/admin/categories/new'}>
						{!isLoggedIn ? <Redirect to='/admin/signin' /> : <NewCategory />}
					</Route>
					<Route exact path={'/admin/categories/'}>
						{!isLoggedIn ? <Redirect to='/admin/signin' /> : <Categories />}
					</Route>
					<Route exact path={'/admin/categories/edit/:categoryId'}>
						{!isLoggedIn ? <Redirect to='/admin/signin' /> : <EditCategory />}
					</Route>
					<Route exact path={'/admin/categories/view/:categoryId'}>
						{!isLoggedIn ? <Redirect to='/admin/signin' /> : <ViewCategory />}
					</Route>
					<Route exact path={'/admin/users/'}>
						{!isLoggedIn ? <Redirect to='/admin/signin' /> : <Users />}
					</Route>
					<Route exact path={'/admin/users/view/:userId'}>
						{!isLoggedIn ? <Redirect to='/admin/signin' /> : <ViewUser />}
					</Route>
					<Route exact path={'/admin/orders/'}>
						{!isLoggedIn ? <Redirect to='/admin/signin' /> : <Orders />}
					</Route>
					<Route exact path={'/admin/orders/view/:orderId'}>
						{!isLoggedIn ? <Redirect to='/admin/signin' /> : <ViewOrder />}
					</Route>

					<Route exact path={'*'}>
						{!isLoggedIn ? <Redirect to='/admin/signin' /> : <Page404 />}
					</Route>
				</Switch>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		state: state
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getUserData: () => {
			dispatch(getUserData());
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
