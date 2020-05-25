import React from 'react';
import { connect } from 'react-redux';

// components
import Layout from '../../components/Layout/Layout';
import Loader from '../../components/Loader/Loader';
import Modal from '../../components/Modal/Modal';

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
					<p>In development</p>
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
