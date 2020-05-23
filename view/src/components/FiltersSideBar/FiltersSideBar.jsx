import React from 'react';

class FiltersSideBar extends React.Component {
	constructor() {
		super();
		this.state = {
			minPriceInput: 0,
			maxPriceInput: 0,
			maxPrice: 0
		};
	}
	componentDidMount() {
		const { products } = this.props;
		const prices = this.getOptions(products, 'price');
		this.setState({
			maxPriceInput: Math.max(...prices),
			maxPrice: Math.max(...prices)
		});
	}
	getOptions(array, key) {
		let options = [];
		array.forEach((item) => {
			options.push(item[key]);
		});
		return [ ...new Set(options) ];
	}

	handleOptionSelect(criteria, value) {
		const { params, history } = this.props;
		const path = history.location.pathname;
		if (value === '') {
			params.delete(criteria);
		} else {
			params.get(criteria) ? params.set(criteria, value) : params.append(criteria, value);
		}
		history.push(`${path}?${params.toString()}`);
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleClearFilters() {
		const { params, history } = this.props;
		const path = history.location.pathname;
		params.forEach((value, key) => {
			if (key !== 'category') {
				params.delete(key);
			}
		});
		this.setState({
			minPriceInput: 0,
			maxPriceInput: this.state.maxPrice
		});
		history.push(`${path}?${params.toString()}`);
	}

	render() {
		const { products } = this.props;
		const brands = this.getOptions(products, 'brand');
		const materials = this.getOptions(products, 'material');
		return (
			<div className='col-12 col-md-3'>
				<h2>Filter</h2>
				<label for='minPrice'>Price from: {this.state.minPriceInput} EUR</label>
				<input
					type='range'
					class='custom-range'
					id='minPrice'
					name='minPriceInput'
					min='0'
					step='5'
					max={this.state.maxPrice}
					value={this.state.minPriceInput}
					onChange={(e) => {
						this.handleChange(e);
						this.handleOptionSelect(e.target.name, e.target.value);
					}}
				/>
				<label for='maxPrice'>Price to: {this.state.maxPriceInput} EUR</label>
				<input
					type='range'
					class='custom-range'
					id='maxPrice'
					name='maxPriceInput'
					min='0'
					step='5'
					max={this.state.maxPrice}
					value={this.state.maxPriceInput}
					onChange={(e) => {
						this.handleChange(e);
						this.handleOptionSelect(e.target.name, e.target.value);
					}}
				/>
				<select
					class='custom-select my-3'
					name='brand'
					onChange={(e) => this.handleOptionSelect(e.target.name, e.target.value)}>
					<option value=''>Filter by brand</option>
					{brands.map((brand, index) => {
						return (
							<option value={brand} key={index}>
								{brand}
							</option>
						);
					})}
				</select>
				<select
					class='custom-select my-3'
					name='material'
					onChange={(e) => this.handleOptionSelect(e.target.name, e.target.value)}>
					<option value=''>Filter by material</option>
					{materials.map((material, index) => {
						return (
							<option value={material} key={index}>
								{material}
							</option>
						);
					})}
				</select>
				<button
					className='btn btn-outline-dark mb-3 form-control form-control-lg'
					onClick={() => this.handleClearFilters()}>
					Clear All Filters
				</button>
			</div>
		);
	}
}

export default FiltersSideBar;
