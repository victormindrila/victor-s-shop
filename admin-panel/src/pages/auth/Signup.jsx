import React from 'react';
import Layout from '../../components/Layout/Layout';
import { Link } from 'react-router-dom';

class Signup extends React.Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			passwordConfirmation: ''
		};
	}

	handleChange() {}

	handleSubmit() {}

	render() {
		return (
			<Layout>
				<div class='columns is-centered'>
					<div class='column is-one-quarter'>
						<form method='POST'>
							<h1 class='title'>Sign Up</h1>
							<div class='field'>
								<label class='label'>First Name</label>
								<input required class='input' placeholder='Email' name='email' />
								<p class='help is-danger'>Error</p>
							</div>
							<div class='field'>
								<label class='label'>Last Name</label>
								<input required class='input' placeholder='Email' name='email' />
								<p class='help is-danger'>Error</p>
							</div>
							<div class='field'>
								<label class='label'>Phone Number</label>
								<input required class='input' placeholder='Email' name='email' />
								<p class='help is-danger'>Error</p>
							</div>
							<div class='field'>
								<label class='label'>Country</label>
								<input required class='input' placeholder='Email' name='email' />
								<p class='help is-danger'>Error</p>
							</div>
							<div class='field'>
								<label class='label'>Username</label>
								<input required class='input' placeholder='Email' name='email' />
								<p class='help is-danger'>Error</p>
							</div>
							<div class='field'>
								<label class='label'>Email</label>
								<input required class='input' placeholder='Email' name='email' />
								<p class='help is-danger'>Error</p>
							</div>
							<div class='field'>
								<label class='label'>Password</label>
								<input required class='input' placeholder='Password' name='password' type='password' />
								<p class='help is-danger'>Error</p>
							</div>
							<div class='field'>
								<label class='label'>Password Confirmation</label>
								<input
									required
									class='input'
									placeholder='Password Confirmation'
									name='passwordConfirmation'
									type='password'
								/>
								<p class='help is-danger'>Error</p>
							</div>
							<button class='button is-primary'>Submit</button>
						</form>
						<Link to='/admin/signin'>Have an account? Sign In</Link>
					</div>
				</div>
			</Layout>
		);
	}
}

export default Signup;
