import React from 'react';

class DropdownSort extends React.Component {
	constructor() {
		super();
		this.state = {
			show: false
		};
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

	handleSortClick(sort) {
		const { params, history } = this.props;
		const path = history.location.pathname;
		params.get('sort') ? params.set('sort', sort) : params.append('sort', sort);
		this.hideDropdown();
		history.push(`${path}?${params.toString()}`);
	}
	render() {
		return (
			<div className='dropdown my-3'>
				<button
					className='btn btn-outline-dark dropdown-toggle mt-1'
					type='button'
					id='dropdownMenuButton'
					data-toggle='dropdown'
					aria-haspopup='true'
					aria-expanded='false'
					onClick={() => this.showDropdown()}>
					Sort
				</button>
				<div className={`dropdown-menu ${this.state.show ? 'show' : ''}`} aria-labelledby='dropdownMenuButton'>
					<button
						className='dropdown-item'
						onClick={() => {
							this.handleSortClick('default');
						}}>
						Default
					</button>
					<button
						className='dropdown-item'
						onClick={() => {
							this.handleSortClick('ascending');
						}}>
						Ascending
					</button>
					<button
						className='dropdown-item'
						onClick={() => {
							this.handleSortClick('descending');
						}}>
						Descending
					</button>
				</div>
			</div>
		);
	}
}

export default DropdownSort;
