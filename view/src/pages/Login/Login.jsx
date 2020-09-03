import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

//style
import './Login.css';

//components
import Error from '../../components/Error/Error';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomInput from '../../components/CustomInput/CustomInput';

//assets
import Logo from '../../assets/images/logo/logo.png';
import { ReactComponent as Google } from '../../assets/icons/google.svg';
import { ReactComponent as Facebook } from '../../assets/icons/facebook.svg';

// actions
import { loginUser, loginUserWithGoogle, updateError } from '../../store/actions/user';
import { selectUserData, selectUserLoading, selectUserError } from '../../store/selectors/user';

//helpers
import { validateLoginData } from './../../utils/validators';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		};
	}
	componentDidUpdate(prevProps) {
		const { user, history } = this.props;
		if (user !== prevProps.user) {
			history.push('/');
		}
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();

		const { email, password } = this.state;
		const { loginUser, updateError } = this.props;

		const { valid, errors } = validateLoginData({ email, password });

		if (!valid) updateError(errors);
		if (valid) loginUser(email, password);
	}

	render() {
		const { userError, userLoading } = this.props;
		const { email, password } = this.state;
		return (
			<div className='login-page'>
				<Link to='/'>
					<img src={Logo} alt='logo' className='' />
				</Link>

				<h1 className='h2 mb-3'>Login</h1>

				<div className='columns is-centered is-vcentered'>
					<div className='column is-one-quarter'>
						<form
							onSubmit={(e) => {
								this.handleSubmit(e);
							}}>
							<CustomInput
								className='form-control form-control-lg'
								name='email'
								placeholder='Email'
								aria-describedby='emailHelp'
								value={email}
								onChange={(e) => this.handleChange(e)}
								error={userError.email}
							/>
							<CustomInput
								type='password'
								className='form-control form-control-lg'
								name='password'
								placeholder='Password'
								value={password}
								onChange={(e) => this.handleChange(e)}
								error={userError.password}
							/>
							{userError.error && <Error error={userError.error} />}
							<CustomButton
								isLoading={userLoading}
								type='submit'
								className='btn btn-outline-dark mb-3 form-control form-control-lg'>
								Log In
							</CustomButton>
						</form>
						<Link to='/signup' className='my-3'>
							Don't have an account? Sign Up with e-mail!
						</Link>
					</div>
				</div>
				<p className='my-2'>or</p>
				<CustomButton
					className='btn btn-outline-dark d-flex align-items-center'
					onClick={() => this.props.loginUserWithGoogle()}>
					<Google className='w-50 mr-3' />
					<span className='text-nowrap pr-3'>Log In with Google</span>
				</CustomButton>
				<CustomButton
					disabled
					className='btn btn-outline-dark d-flex align-items-center mt-3'
					onClick={() => this.props.loginUserWithGoogle()}>
					<Facebook className='w-50 mr-3' />
					<span className='text-nowrap'>Log In with Facebook</span>
				</CustomButton>
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	user: selectUserData,
	userLoading: selectUserLoading,
	userError: selectUserError
});

function mapDispatchToProps(dispatch) {
	return {
		loginUser: (email, password) => {
			dispatch(loginUser(email, password));
		},
		loginUserWithGoogle: () => {
			dispatch(loginUserWithGoogle());
		},
		updateError: (payload) => {
			dispatch(updateError(payload));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
