import React from 'react';
import './Slider.css';
import banner1 from '../../assets/images/banner1.jpg';
import banner2 from '../../assets/images/banner2.jpg';
import banner3 from '../../assets/images/banner3.jpg';
import Slide from './Slide/Slide';
import Timer from '../../utils/Timer';

class Slider extends React.Component {
	constructor() {
		super();
		this.state = {
			images: [ banner1, banner2, banner3 ],
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
		}, 100000);
	}

	componentDidMount() {
		this.setState({ displayImage: banner1 });
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
