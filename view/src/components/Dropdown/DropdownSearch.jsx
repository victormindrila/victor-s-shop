import React from 'react';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { connect } from 'react-redux';

import './DropdownSearch.css';
import { selectProductsData } from '../../store/selectors/products';

class DropdownSearch extends React.Component {
	constructor() {
		super();
		this.state = {
			show: false,
			search: ''
		};
		this.setWrapperRef = this.setWrapperRef.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
	}

	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutside);
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside);
	}
	setWrapperRef(node) {
		this.wrapperRef = node;
	}
	handleClickOutside(event) {
		if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
			this.hideDropdown();
		}
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	hideDropdown() {
		this.setState({
			show: false,
			search: ''
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
			products.filter((product) => product.title.toLowerCase().includes(this.state.search.toLowerCase()));
		return (
			<div className='dropdown w-100' ref={this.setWrapperRef}>
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

const mapStateToProps = createStructuredSelector({
	products: selectProductsData
});

export default connect(mapStateToProps)(DropdownSearch);
