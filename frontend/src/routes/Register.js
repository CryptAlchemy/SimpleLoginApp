import React from "react";
import axios from "axios";

import FormAlert from "../components/FormAlert";
import AuthWrapper from "../components/AuthWrapper";

import Button from "react-bootstrap/Button";

const validateEmail = (email) => {
	return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};

export default class Register extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			error: null,
		};
	}

	// Perform client-side validation
	handleSubmit = (e) => {
		e.preventDefault();

		// Clear error state
		this.setState({ error: null });

		// Get form data
		const fd = new FormData(e.target);
		const data = Object.fromEntries(fd.entries());

		// Ensure email is valid
		if (!validateEmail(data.Email)) {
			this.setState({ error: "Please enter a valid email address." });
			return;
		}

		// Ensure password has one special character
		if (!data.Password.match(/[^a-zA-Z0-9]/)) {
			this.setState({ error: "The password must contain at least one special character." });
			return;
		}

		// Ensure password has one number
		if (!data.Password.match(/[0-9]/)) {
			this.setState({ error: "The password must contain at least one number." });
			return;
		}

		// Ensure password has one uppercase letter
		if (!data.Password.match(/[A-Z]/)) {
			this.setState({ error: "The password must contain at least one uppercase letter." });
			return;
		}

		// Ensure password and password confirmation match
		if (data.Password !== data.Password_Confirmation) {
			this.setState({ error: "Your passwords do not match." });
			return;
		}

		// Send data to server
		axios
			.put("/user", data)
			.then((response) => {
				// Show success message
				this.setState({ error: "-1" });
			})
			.catch((e) => {
				this.setState({ error: e.response.data.message ?? "An unknown error occurred. Please contact us." });
				console.log(`Error registering user!`, e.response);
			});
	};

	render() {
		return (
			<AuthWrapper>
				{this.state.error ? <FormAlert message={this.state.error} /> : null}
				<h4>Create a new account</h4>
				<p className="text-muted">It's free and always will be.</p>
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<input type="text" className="form-control" name="Name" placeholder="Full name" required />
					</div>
					<div className="form-group mt-3">
						<input type="email" className="form-control" name="Email" placeholder="Email address" required />
					</div>
					<div className="form-group mt-3">
						<input type="password" className="form-control" name="Password" placeholder="Password" minLength={12} required />
					</div>
					<div className="form-group mt-3">
						<input type="password" className="form-control" name="Password_Confirmation" placeholder="Confirm password" required />
					</div>
					<Button variant="primary" type="submit" className="mt-3 w-100">
						Sign Up
					</Button>
				</form>
			</AuthWrapper>
		);
	}
}
