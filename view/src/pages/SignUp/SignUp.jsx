import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

//style
import './SignUp.css';

//assets
import Logo from '../../assets/images/logo/logo.png';

//components
import Error from '../../components/Error/Error';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';

// actions
import { signUpUser, updateError } from '../../store/actions/user';

//helpers
import { validateSignUpData } from './../../utils/validators';
import { selectUserData, selectUserError, selectUserLoading } from '../../store/selectors/user';

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
		this.handleChange = this.handleChange.bind(this);
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
		if (valid) signUpUser(userData);
		if (!valid) updateError(errors);
	}

	render() {
		const { firstName, lastName, phone, country, email, password, passwordConfirmation } = this.state;
		const { userError, userLoading } = this.props;
		return (
			<div className='signup-page'>
				<Link to='/'>
					<img src={Logo} alt='logo' className='' />
				</Link>
				<h1 className='h2 mb-3'>Sign Up</h1>
				<form onSubmit={(e) => this.handleSubmit(e)}>
					{userError.error && <Error error={userError.error} />}
					<CustomInput
						label='First Name'
						htmlFor='firstName'
						className='form-control form-control-lg'
						placeholder='First Name'
						name='firstName'
						value={firstName}
						onChange={(e) => this.handleChange(e)}
						error={userError.firstName}
					/>

					<CustomInput
						label='Last Name'
						htmlFor='lastName'
						className='form-control form-control-lg'
						placeholder='Last Name'
						name='lastName'
						value={lastName}
						onChange={(e) => this.handleChange(e)}
						error={userError.lastName}
					/>

					<CustomInput
						label='Phone Number'
						htmlFor='phoneNumber'
						className='form-control form-control-lg'
						placeholder='Phone Number'
						name='phone'
						value={phone}
						onChange={(e) => this.handleChange(e)}
						error={userError.phoneNumber}
					/>

					<CustomInput
						label='Country'
						htmlFor='country'
						className='form-control form-control-lg'
						placeholder='Country'
						name='country'
						value={country}
						onChange={(e) => this.handleChange(e)}
						error={userError.country}
					/>

					<CustomInput
						label='Email'
						htmlFor='email'
						className='form-control form-control-lg'
						placeholder='Email'
						name='email'
						value={email}
						onChange={(e) => this.handleChange(e)}
						error={userError.email}
					/>

					<CustomInput
						label='Password'
						htmlFor='password'
						className='form-control form-control-lg'
						placeholder='Password'
						type='password'
						name='password'
						value={password}
						onChange={(e) => this.handleChange(e)}
						error={userError.password}
					/>

					<CustomInput
						label='Password Confirmation'
						htmlFor='passwordConfirmation'
						className='form-control form-control-lg'
						placeholder='Password Confirmation'
						name='passwordConfirmation'
						type='password'
						value={passwordConfirmation}
						onChange={(e) => this.handleChange(e)}
						error={userError.passwordConfirmation}
					/>

					<CustomButton className='btn btn-outline-dark mb-3 form-control form-control-lg' isLoading={userLoading}>
						Submit
					</CustomButton>
				</form>
				<Link to='/login'>Have an account? Sign In</Link>
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	userData: selectUserData,
	userError: selectUserError,
	userLoading: selectUserLoading
});

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
