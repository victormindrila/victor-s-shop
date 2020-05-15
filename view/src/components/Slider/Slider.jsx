import React from 'react';
import './Slider.css';
import dick_1778 from '../../assets/images/banners/dick_1778.jpg';
import Flatware from '../../assets/images/banners/Flatware.jpg';
import Victorinox from '../../assets/images/banners/VictorInox.jpg';
import wood_collection from '../../assets/images/banners/wood_collection.jpg';
import Slide from './Slide/Slide';
import Timer from '../../utils/Timer';

class Slider extends React.Component {
	constructor() {
		super();
		this.state = {
			images: [ dick_1778, Flatware, Victorinox, wood_collection ],
			displayImage: '',
			activeImageIndex: 0,
			show: true
		};

		this.i = 0;
		this.timer = new Timer(() => {
			this.i += 1;
			if (this.i > this.state.images.length - 1) this.i = 0;
			this.setState({
				displayImage: this.state.images[this.i],
				activeImageIndex: this.i
			});
		}, 5000);
	}

	componentDidMount() {
		this.setState({ displayImage: dick_1778 });
		this.timer.start();
	}

	handleClick(number) {
		let slideNumber = number <= this.state.images.length - 1 && number >= 0 ? number : 0;
		this.setState({ displayImage: this.state.images[slideNumber], activeImageIndex: slideNumber, show: true });
		this.timer.reset();
	}

	render() {
		return (
			<div className='slider mb-3'>
				<Slide
					image={this.state.displayImage}
					active={this.state.activeImageIndex}
					total={this.state.images.length}
					show={this.state.show}
					clickFunction={(e) => this.handleClick(e)}
				/>
			</div>
		);
	}
}

export default Slider;
