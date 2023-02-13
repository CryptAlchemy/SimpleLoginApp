import React from "react";
import axios from "axios";

import FormAlert from "../components/FormAlert";
import AuthWrapper from "../components/AuthWrapper";

import Button from "react-bootstrap/Button";

export default class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			error: null,
		};
	}

	// Try logging in
	handleSubmit = (e) => {
		e.preventDefault();

		// Clear error state
		this.setState({ error: null });

		// Get form data
		const fd = new FormData(e.target);
		const data = Object.fromEntries(fd.entries());

		// Send data to server
		axios
			.post("/user", data)
			.then((response) => {
				// Redirect to logged in page
				window.location.href = "/sunshine";
			})
			.catch((e) => {
				this.setState({ error: e.response.data.message ?? "An unknown error occurred. Please contact us." });
				console.log(`Error logging in user!`, e.response);
			});
	};

	render() {
		return (
			<AuthWrapper>
				{this.state.error ? <FormAlert message={this.state.error} /> : null}
				<h4>Sign In</h4>
				<p className="text-muted">Please enter your account credentials.</p>
				<form onSubmit={this.handleSubmit}>
					<div className="form-group mt-3">
						<input type="email" className="form-control" name="Email" placeholder="Email address" required />
					</div>
					<div className="form-group mt-3">
						<input type="password" className="form-control" name="Password" placeholder="Password" required />
					</div>
					<Button variant="primary" type="submit" className="mt-3 w-100">
						Log In
					</Button>
				</form>
			</AuthWrapper>
		);
	}
}
