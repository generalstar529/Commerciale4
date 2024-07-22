import React, { useEffect, useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import "./index.css";
import { STRINGS } from "../../utils/strings";

const ImageCropper = (options, onSave, onCancel) => {
    const [crop, setCrop] = useState({
            unit: "%",
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            aspect: props.options.ratio,
        });
    const [image, setImage] = useState(null);

    useEffect(() => {
        let elem = document.querySelector(".ReactCrop__image");
        elem.style.display = "none";

        let _image = new Image();
        _image.onload = () => {
            if (_image.width > _image.height) {
                if (_image.width > 800) {
                    elem.style.width = 800 + "px";
                    elem.style.height = (_image.height / _image.width) * 800 + "px";
                } else {
                    elem.style.width = _image.width;
                    elem.style.height = _image.height;
                }
            } else {
                if (_image.height > 600) {
                    elem.style.height = 600 + "px";
                    elem.style.width = (_image.width / _image.height) * 600 + "px";
                } else {
                    elem.style.width = _image.width;
                    elem.style.height = _image.height;
                }
            }
            elem.style.display = "block";
            let _crop = {
                unit: "%",
                x: 0,
                y: 0,
                width: 100,
                height: 100,
                aspect: options.ratio,
            };

            if (_image.width / _image.height === 1 && options.ratio === 1) {
                crop.unit = "px";
                crop.width = elem.offsetWidth;
                crop.height = elem.offsetHeight;
            }

            setCrop(_crop);
        };
        _image.src = options._image;
        setImage(_image)
    }, [])

        
    handleCropChange = (_crop) => {
        setCrop(_crop);
    };

    handleSaveImage = async () => {
        const canvas = document.createElement("canvas");
        const elem = document.querySelector(".ReactCrop");

        const scaleX = image.width / elem.offsetWidth;
        const scaleY = image.height / elem.offsetHeight;
        canvas.width = crop.width * scaleX < options.maxWidth ? crop.width * scaleX : options.maxWidth;
        canvas.height = crop.height * scaleY < options.maxWidth / options.ratio ? crop.height * scaleY : options.maxWidth / options.ratio;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(image, crop.x * scaleX, crop.y * scaleY, crop.width * scaleX, crop.height * scaleY, 0, 0, canvas.width, canvas.height);

        const croppedImage = canvas.toDataURL("image/jpeg");
        onSave(croppedImage);
    };
    
    return (
        <div className="cropper-modal">
            <div className={`-content ${options.circle && "circle"}`}>
                <h5 className="mb-3">{STRINGS.cropImage}</h5>
                <ReactCrop src={options.image} crop={this.state.crop} onChange={handleCropChange} />
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

export default ImageCropper;