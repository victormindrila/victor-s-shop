import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//components
import Error from '../../components/Error/Error';
import Loader from '../../components/Loader/Loader';

// actions
import { signUpUser, updateError } from '../../store/actions/user';

//helpers
import { validateSignUpData } from './../../utils/validators';

class Signup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			phone: '',
			country: '',
			email: '',
			password: '',
			passwordConfirmation: ''
		};
	}

	componentDidUpdate(prevProps) {
		if (this.props.userData !== prevProps.userData) {
			this.props.history.push('/admin/products');
		}
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		const { signUpUser, updateError } = this.props;
		const userData = {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			phoneNumber: this.state.phone,
			country: this.state.country,
			email: this.state.email,
			password: this.state.password,
			confirmPassword: this.state.passwordConfirmation
		};
		const { valid, errors } = validateSignUpData(userData);
		if (valid) signUpUser(userData);
		if (!valid) updateError(errors);
	}

	render() {
		if (this.props.userLoading) {
			return <Loader />;
		} else {
			return (
				<div className='columns is-centered'>
					<div className='column is-one-quarter'>
						<form method='POST' onSubmit={(e) => this.handleSubmit(e)}>
							<h1 className='title'>Sign Up</h1>
							{this.props.userError.error && <Error error={this.props.userError.error} />}
							<div className='field'>
								<label className='label'>First Name</label>
								<input
									className='input'
									placeholder='First Name'
									name='firstName'
									value={this.state.firstName}
									onChange={(e) => this.handleChange(e)}
								/>
								{this.props.userError.firstName && <Error error={this.props.userError.firstName} />}
							</div>
							<div className='field'>
								<label className='label'>Last Name</label>
								<input
									className='input'
									placeholder='Last Name'
									name='lastName'
									value={this.state.lastName}
									onChange={(e) => this.handleChange(e)}
								/>
								{this.props.userError.lastName && <Error error={this.props.userError.lastName} />}
							</div>
							<div className='field'>
								<label className='label'>Phone Number</label>
								<input
									className='input'
									placeholder='Phone Number'
									name='phone'
									value={this.state.phone}
									onChange={(e) => this.handleChange(e)}
								/>
								{this.props.userError.phoneNumber && <Error error={this.props.userError.phoneNumber} />}
							</div>
							<div className='field'>
								<label className='label'>Country</label>
								<input
									className='input'
									placeholder='Country'
									name='country'
									value={this.state.country}
									onChange={(e) => this.handleChange(e)}
								/>
								{this.props.userError.country && <Error error={this.props.userError.country} />}
							</div>
							<div className='field'>
								<label className='label'>Email</label>
								<input
									className='input'
									placeholder='Email'
									name='email'
									value={this.state.email}
									onChange={(e) => this.handleChange(e)}
								/>
								{this.props.userError.email && <Error error={this.props.userError.email} />}
							</div>
							<div className='field'>
								<label className='label'>Password</label>
								<input
									className='input'
									placeholder='Password'
									name='password'
									type='password'
									value={this.state.password}
									onChange={(e) => this.handleChange(e)}
								/>
								{this.props.userError.password && <Error error={this.props.userError.password} />}
							</div>
							<div className='field'>
								<label className='label'>Password Confirmation</label>
								<input
									className='input'
									placeholder='Password Confirmation'
									name='passwordConfirmation'
									type='password'
									value={this.state.passwordConfirmation}
									onChange={(e) => this.handleChange(e)}
								/>
								{this.props.userError.confirmPassword && <Error error={this.props.userError.confirmPassword} />}
							</div>
							<button className='button is-primary'>Submit</button>
						</form>
						<Link to='/admin/signin'>Have an account? Sign In</Link>
					</div>
				</div>
			);
		}
	}
}

function mapStateToProps(state) {
	return {
		userData: state.user.data,
		userError: state.user.error,
		userLoading: state.user.loading
	};
}

function mapDispatchToProps(dispatch) {
	return {
		signUpUser: (userData) => {
			dispatch(signUpUser(userData));
		},
		updateError: (payload) => {
			dispatch(updateError(payload));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
