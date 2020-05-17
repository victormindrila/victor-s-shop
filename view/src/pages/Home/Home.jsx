import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//actions
import { getAllCategories } from '../../store/actions/categories';

// components
import Layout from '../../components/Layout/Layout';
import HomeCategory from '../../components/HomeCategory/HomeCategory';
import Loader from '../../components/Loader/Loader';

//helpers
import axios from 'axios';

class Home extends React.Component {
	componentDidMount() {
		const { categories, getAllCategories } = this.props;
		if (!categories.data) getAllCategories();
	}

	render() {
		const { categories } = this.props;
		return (
			<Layout>
				<div className='d-flex justify-content-center'>{categories.loading && <Loader />}</div>

				<div className='container-fluid container-min-max-width'>
					<div className='row'>
						{categories.data &&
							categories.data.map((category) => {
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
		categories: state.categories
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getAllCategories: () => {
			dispatch(getAllCategories());
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
