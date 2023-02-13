import React from "react";

export default class AuthWrapper extends React.Component {
	render() {
		return (
			<div className="h-100 d-flex align-items-center justify-content-center">
				<div className="rounded bg-light p-4">{this.props.children}</div>
			</div>
		);
	}
}
