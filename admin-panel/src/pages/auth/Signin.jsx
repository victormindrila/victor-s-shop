import React from 'react';
import Layout from '../../components/Layout/Layout';
import { Link } from 'react-router-dom';

class Signin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		};
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSignin(event) {
		event.preventDefault();
		const { signInWithEmailAndPassword, history } = this.props;
		const { email, password } = this.state;
		signInWithEmailAndPassword(email, password);
	}
	render() {
		return (
			<Layout>
				<div className='columns is-centered'>
					<div className='column is-one-quarter'>
						<form method='POST' onSubmit={(event) => this.handleSignin(event)}>
							<h1 className='title'>Sign in</h1>
							<div className='field'>
								<label className='label'>Email</label>
								<input
									className='input'
									placeholder='Email'
									name='email'
									value={this.state.email}
									onChange={(e) => this.handleChange(e)}
								/>
								<p className='help is-danger'>Error</p>
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
								<p className='help is-danger'>Error</p>
							</div>
							<button className='button is-primary'>Submit</button>
						</form>
						<Link to='/admin/signup'>Need an account? Sign Up</Link>
					</div>
				</div>
			</Layout>
		);
	}
}

export default Signin;
