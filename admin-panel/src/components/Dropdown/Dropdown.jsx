import React from 'react';

class Dropdown extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isActive: false
		};
	}

	handleSelect() {
		this.setState({
			isActive: !this.state.isActive
		});
	}
	render() {
		const { isActive } = this.state;
		const { listName } = this.props;
		return (
			<div className={`dropdown ${isActive ? 'is-active' : ''}`} onClick={(e) => this.handleSelect()}>
				<div className='dropdown-trigger'>
					<button className='button' aria-haspopup='true' aria-controls='dropdown-menu'>
						<span>{listName}</span>
						<span className='icon is-small'>
							<i className='fas fa-angle-down' aria-hidden='true' />
						</span>
					</button>
				</div>
				<div className='dropdown-menu' id='dropdown-menu' role='menu'>
					<div className='dropdown-content'>{this.props.children}</div>
				</div>
			</div>
		);
	}
}

export default Dropdown;
