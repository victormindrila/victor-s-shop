import React from 'react';

import CustomSelect from '../CustomSelect/CustomSelect';
import CustomInput from '../CustomInput/CustomInput';

class FiltersSideBar extends React.Component {
	constructor() {
		super();
		this.state = {
			minPriceInput: 0,
			maxPriceInput: 0,
			maxPrice: 0
		};
		this.handleOptionSelect = this.handleOptionSelect.bind(this);
	}
	componentDidMount() {
		const { prices } = this.props.filterOptions;
		const maxPrice = Number(Math.max(...prices)) + 50;
		this.setState({
			maxPriceInput: maxPrice,
			maxPrice: maxPrice
		});
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
		const { brands, materials } = this.props.filterOptions;
		return (
			<div className='col-12 col-md-3'>
				<h2>Filter</h2>
				<CustomInput
					htmlFor='minPrice'
					label={`Price from: ${this.state.minPriceInput} EUR`}
					type='range'
					className='custom-range'
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
				<CustomInput
					htmlFor='maxPrice'
					label={`Price to: ${this.state.maxPriceInput} EUR`}
					type='range'
					className='custom-range'
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
				<CustomSelect
					className='custom-select my-3'
					name='brand'
					defaultOption='Filter by brand'
					options={brands}
					handleOptionSelect={this.handleOptionSelect}
				/>
				<CustomSelect
					className='custom-select my-3'
					name='material'
					defaultOption='Filter by material'
					options={materials}
					handleOptionSelect={this.handleOptionSelect}
				/>
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
