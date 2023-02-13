import React from "react";

import Alert from "react-bootstrap/Alert";

export default class FormAlert extends React.Component {
	render() {
		return (
			<Alert variant={this.props.message === "-1" ? "success" : "danger"}>
				{this.props.message === "-1" ? (
					<div>
						Account created successfully.
						<br />
						<a href="/login">Click here to log in.</a>
					</div>
				) : (
					this.props.message
				)}
			</Alert>
		);
	}
}
