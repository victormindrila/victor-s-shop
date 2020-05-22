import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//actions
import { getAllCategories } from '../../store/actions/categories';
import { getAllProducts } from '../../store/actions/products';

// components
import Layout from '../../components/Layout/Layout';
import HomeCategory from '../../components/HomeCategory/HomeCategory';
import Loader from '../../components/Loader/Loader';

class Home extends React.Component {
	componentDidMount() {
		const { categories, products, getAllCategories, getAllProducts } = this.props;
		if (categories.data.length === 0) getAllCategories();
		if (products.data.length === 0) getAllProducts();
	}

	render() {
		const { categories } = this.props;
		return (
			<Layout>
				<div className='d-flex justify-content-center'>{categories.loading && <Loader />}</div>

				<div className='container-fluid container-min-max-width'>
					<div className='row'>
						{categories.data.map((category) => {
							const { id, name, description, imageUrl } = category;
							return <HomeCategory key={id} route={id} name={name} description={description} image={imageUrl} />;
						})}
					</div>
					<div>
						<hr />
						<div className='d-flex justify-content-center'>
							<Link to='/products'>
								<button className='btn btn-outline-dark my-3'>View all products</button>
							</Link>
						</div>
						<hr />
					</div>
				</div>
			</Layout>
		);
	}
}

function mapStateToProps(state) {
	return {
		categories: state.categories,
		products: state.products
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getAllCategories: () => {
			dispatch(getAllCategories());
		},
		getAllProducts: () => {
			dispatch(getAllProducts());
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
