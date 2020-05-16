import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//style
import './SignUp.css';

//assets
import Logo from '../../assets/images/logo/logo.png';

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
			this.props.history.push('/');
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
		console.log(valid, errors);
		if (valid) signUpUser(userData);
		if (!valid) updateError(errors);
	}

	render() {
		return (
			<div className='signup-page'>
				<Link to='/'>
					<img src={Logo} alt='logo' className='' />
				</Link>
				<h1 className='h2 mb-3'>Sign Up</h1>
				{this.props.userLoading && <Loader />}
				<div className='columns is-centered is-vcentered'>
					<div className='column is-one-quarter'>
						<form onSubmit={(e) => this.handleSubmit(e)}>
							{this.props.userError.error && <Error error={this.props.userError.error} />}
							<div className='form-group'>
								<label className='label'>First Name</label>
								<input
									className='form-control form-control-lg'
									placeholder='First Name'
									name='firstName'
									value={this.state.firstName}
									onChange={(e) => this.handleChange(e)}
								/>
								{this.props.userError.firstName && <Error error={this.props.userError.firstName} />}
							</div>
							<div className='form-group'>
								<label className='label'>Last Name</label>
								<input
									className='form-control form-control-lg'
									placeholder='Last Name'
									name='lastName'
									value={this.state.lastName}
									onChange={(e) => this.handleChange(e)}
								/>
								{this.props.userError.lastName && <Error error={this.props.userError.lastName} />}
							</div>
							<div className='form-group'>
								<label className='label'>Phone Number</label>
								<input
									className='form-control form-control-lg'
									placeholder='Phone Number'
									name='phone'
									value={this.state.phone}
									onChange={(e) => this.handleChange(e)}
								/>
								{this.props.userError.phoneNumber && <Error error={this.props.userError.phoneNumber} />}
							</div>
							<div className='form-group'>
								<label className='label'>Country</label>
								<input
									className='form-control form-control-lg'
									placeholder='Country'
									name='country'
									value={this.state.country}
									onChange={(e) => this.handleChange(e)}
								/>
								{this.props.userError.country && <Error error={this.props.userError.country} />}
							</div>
							<div className='form-group'>
								<label className='label'>Email</label>
								<input
									className='form-control form-control-lg'
									placeholder='Email'
									name='email'
									value={this.state.email}
									onChange={(e) => this.handleChange(e)}
								/>
								{this.props.userError.email && <Error error={this.props.userError.email} />}
							</div>
							<div className='form-group'>
								<label className='label'>Password</label>
								<input
									className='form-control form-control-lg'
									placeholder='Password'
									name='password'
									type='password'
									value={this.state.password}
									onChange={(e) => this.handleChange(e)}
								/>
								{this.props.userError.password && <Error error={this.props.userError.password} />}
							</div>
							<div className='form-group'>
								<label className='label'>Password Confirmation</label>
								<input
									className='form-control form-control-lg'
									placeholder='Password Confirmation'
									name='passwordConfirmation'
									type='password'
									value={this.state.passwordConfirmation}
									onChange={(e) => this.handleChange(e)}
								/>
								{this.props.userError.confirmPassword && <Error error={this.props.userError.confirmPassword} />}
							</div>
							<button className='btn btn-outline-dark mb-3 form-control form-control-lg'>Submit</button>
						</form>
						<Link to='/login'>Have an account? Sign In</Link>
					</div>
				</div>
			</div>
		);
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
