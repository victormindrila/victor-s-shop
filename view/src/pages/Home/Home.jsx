import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

//actions
import { getAllCategoriesIfNecessary } from '../../store/actions/categories';
import { selectCategoriesData, selectCategoriesLoading } from '../../store/selectors/categories';

// components
import Layout from '../../components/Layout/Layout';
import Slider from '../../components/Slider/Slider';
import CategoriesList from '../../components/CategoriesList/CategoriesList';
import ShowAllProductsButton from '../../components/ShowAllProductsButton/ShowAllProductsButton';
import WithSpinner from '../../components/HOCs/WithSpinner';

const CategoriesSectionWithSpinner = WithSpinner(({ categories }) => (
	<div className='container-fluid container-min-max-width'>
		<Slider />
		<CategoriesList categories={categories} />
		<ShowAllProductsButton />
	</div>
));

class Home extends React.Component {
	componentDidMount() {
		this.props.getAllCategoriesIfNecessary();
	}

	render() {
		const { categoriesLoading, categories } = this.props;
		return (
			<Layout title='Home'>
				<CategoriesSectionWithSpinner isLoading={categoriesLoading} categories={categories} />
			</Layout>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	categories: selectCategoriesData,
	categoriesLoading: selectCategoriesLoading
});

const mapDispatchToProps = (dispatch) => ({
	getAllCategoriesIfNecessary: (state) => {
		dispatch(getAllCategoriesIfNecessary(state));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
