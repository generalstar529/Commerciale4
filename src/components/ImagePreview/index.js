import React, { Component } from "react";
import "./index.css";

export default class ImagePreview extends Component {
	render() {
		const { images, onClose } = this.props;
		return (
			<div className="image-preview" onClick={onClose}>
				<div className="-content">
					<div>
						{images && images.length ? images.map((image, index) => <img key={index} src={image} />) : <div />}
						{/* <div className="btn-prev">
							<i className="fa fa-arrow-left" />
						</div>
						<div className="btn-next">
							<i className="fa fa-arrow-right" />
						</div> */}
					</div>
				</div>
			</div>
		);
	}
}
