import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

//actions
import { getAllCategories } from '../../store/actions/categories';
import { getAllProducts } from '../../store/actions/products';
import { selectCategoriesData, selectCategoriesLoading } from '../../store/selectors/categories';
import { selectProductsData } from '../../store/selectors/products';

// components
import Layout from '../../components/Layout/Layout';
import Loader from '../../components/Loader/Loader';
import Slider from '../../components/Slider/Slider';
import CategoriesList from '../../components/CategoriesList/CategoriesList';

class Home extends React.Component {
	componentDidMount() {
		const { categories, products, getAllCategories, getAllProducts } = this.props;
		if (categories.length === 0) getAllCategories();
		if (products.length === 0) getAllProducts();
	}

	render() {
		const { categoriesLoading, categories } = this.props;
		console.log(categoriesLoading);
		return (
			<Layout>
				<div className='d-flex justify-content-center'>{categoriesLoading && <Loader />}</div>

				<div className='container-fluid container-min-max-width'>
					{categoriesLoading ? (
						<Loader />
					) : (
						<React.Fragment>
							<Slider />
							<CategoriesList categories={categories} />
							<div>
								<hr />
								<div className='d-flex justify-content-center'>
									<Link to='/products/'>
										<button className='btn btn-outline-dark my-3'>View all products</button>
									</Link>
								</div>
								<hr />
							</div>
						</React.Fragment>
					)}
				</div>
			</Layout>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	categories: selectCategoriesData,
	products: selectProductsData,
	categoriesLoading: selectCategoriesLoading
});

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
