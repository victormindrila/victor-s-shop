import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import HomeCategory from '../../components/HomeCategory/HomeCategory';
import Loader from '../../components/Loader/Loader';

//helpers
import axios from 'axios';

class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			categories: [],
			loading: false,
			error: ''
		};
	}

	componentDidMount() {
		this.fetchCategories();
	}

	fetchCategories() {
		this.setState({
			loading: true
		});
		axios
			.get('/categories')
			.then((response) => {
				this.setState({
					categories: response.data,
					loading: false
				});
			})
			.catch((error) => {
				this.setState({
					error: error.response.data.error
				});
			});
	}

	render() {
		return (
			<Layout>
				<div className='d-flex justify-content-center'>{this.state.loading && <Loader />}</div>

				<div className='container-fluid container-min-max-width'>
					<div className='row'>
						{this.state.categories.map((category) => {
							const { id, name, description, imageUrl } = category;
							return <HomeCategory key={id} route={category} name={name} description={description} image={imageUrl} />;
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

export default Home;
