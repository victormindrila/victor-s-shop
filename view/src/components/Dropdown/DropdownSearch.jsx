import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

class DropdownSearch extends React.Component {
	constructor() {
		super();
		this.state = {
			show: false,
			search: ''
		};
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	hideDropdown() {
		this.setState({
			show: false
		});
	}

	showDropdown() {
		this.setState({
			show: true
		});
	}

	render() {
		const { products } = this.props;
		const filteredProducts =
			this.state.search &&
			products.data.filter((product) => product.title.toLowerCase().includes(this.state.search.toLowerCase()));
		return (
			<div className='dropdown w-100 mr-4'>
				<input
					className='form-control '
					type='text'
					placeholder='Search'
					name='search'
					value={this.state.search}
					onChange={(e) => {
						this.handleChange(e);
						this.showDropdown();
					}}
				/>
				{filteredProducts && (
					<div className={`dropdown-menu ${this.state.show ? 'show' : ''} w-100`}>
						{filteredProducts.map((product) => {
							return (
								<Link
									key={product.id}
									to={`/product/${product.id}`}
									className='dropdown-item'
									onClick={() => this.hideDropdown()}>
									{product.title}
								</Link>
							);
						})}
					</div>
				)}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		products: state.products
	};
}

export default connect(mapStateToProps)(DropdownSearch);
