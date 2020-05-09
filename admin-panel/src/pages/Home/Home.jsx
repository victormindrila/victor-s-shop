import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// components
import Layout from '../../components/Layout/Layout';
import Loader from '../../components/Loader/Loader';
import Error from '../../components/Error/Error';
import Modal from '../../components/Modal/Modal';

//helpers
import axios from 'axios';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			displayModal: false,
			modalError: '',
			success: ''
		};
	}

	componentDidUpdate() {}
	componentDidMount() {}

	render() {
		if (this.props.user.loading) {
			return <Loader />;
		} else {
			return (
				<Layout>
					<Modal error={this.state.modalError} message={this.state.success} active={this.state.displayModal} />
					<p>Something</p>
				</Layout>
			);
		}
	}
}

function mapStateToProps(state) {
	return {
		user: state.user.data
	};
}

export default connect(mapStateToProps)(Home);
