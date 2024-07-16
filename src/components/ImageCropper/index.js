import React, { Component } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import "./index.css";
import { STRINGS } from "../../utils/strings";

export default class ImageCropper extends Component {
    constructor(props) {
        super(props);

        this.state = {
            crop: {
                unit: "%",
                x: 0,
                y: 0,
                width: 100,
                height: 100,
                aspect: props.options.ratio,
            },
            image: null,
        };
    }

    handleCropChange = (crop) => {
        this.setState({ crop });
    };

    handleSaveImage = async () => {
        const { options, onSave } = this.props;
        const { crop, image } = this.state;

        const canvas = document.createElement("canvas");
        let elem = document.querySelector(".ReactCrop");

        const scaleX = image.width / elem.offsetWidth;
        const scaleY = image.height / elem.offsetHeight;
        canvas.width = crop.width * scaleX < options.maxWidth ? crop.width * scaleX : options.maxWidth;
        canvas.height = crop.height * scaleY < options.maxWidth / options.ratio ? crop.height * scaleY : options.maxWidth / options.ratio;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(image, crop.x * scaleX, crop.y * scaleY, crop.width * scaleX, crop.height * scaleY, 0, 0, canvas.width, canvas.height);

        let croppedImage = canvas.toDataURL("image/jpeg");
        onSave(croppedImage);
    };

    componentDidMount = () => {
        const { options } = this.props;

        let elem = document.querySelector(".ReactCrop__image");
        elem.style.display = "none";

        let image = new Image();
        image.onload = () => {
            if (image.width > image.height) {
                if (image.width > 800) {
                    elem.style.width = 800 + "px";
                    elem.style.height = (image.height / image.width) * 800 + "px";
                } else {
                    elem.style.width = image.width;
                    elem.style.height = image.height;
                }
            } else {
                if (image.height > 600) {
                    elem.style.height = 600 + "px";
                    elem.style.width = (image.width / image.height) * 600 + "px";
                } else {
                    elem.style.width = image.width;
                    elem.style.height = image.height;
                }
            }
            elem.style.display = "block";
            let crop = {
                unit: "%",
                x: 0,
                y: 0,
                width: 100,
                height: 100,
                aspect: options.ratio,
            };

            if (image.width / image.height === 1 && options.ratio === 1) {
                crop.unit = "px";
                crop.width = elem.offsetWidth;
                crop.height = elem.offsetHeight;
            }

            this.setState({
                crop,
            });
        };
        image.src = options.image;
        this.setState({ image });
    };

    render() {
        const { options, onCancel } = this.props;
        return (
            <div className="cropper-modal">
                <div className={`-content ${options.circle && "circle"}`}>
                    <h5 className="mb-3">{STRINGS.cropImage}</h5>
                    <ReactCrop src={options.image} crop={this.state.crop} onChange={this.handleCropChange} />
                    <div className="mt-2 d-flex justify-content-end">
                        <button className="mr-2" onClick={this.handleSaveImage}>
                            {STRINGS.save}
                        </button>
                        <button onClick={onCancel}>{STRINGS.cancel}</button>
                    </div>
                </div>
            </div>
        );
    }
}
