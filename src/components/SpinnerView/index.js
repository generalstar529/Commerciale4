import React, { Component } from "react";
import "./index.css";
import { Spinner } from "react-bootstrap";

export default class SpinnerView extends Component {
	render() {
		return (
			<div className="spinner-view">
				<Spinner animation="border" />
			</div>
		);
	}
}
