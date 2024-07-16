export const scaleImage = (image, max) => {
	const canvas = document.createElement("canvas");
	canvas.width = image.width;
	canvas.height = image.height;

	let scale = 1;
	if (image.width < image.height) {
		scale = image.height / max;
		if (scale > 1) {
			canvas.width = image.width / scale;
			canvas.height = max;
		}
	} else {
		scale = image.width / max;
		if (scale > 1) {
			canvas.width = max;
			canvas.height = image.height / scale;
		}
	}

	const ctx = canvas.getContext("2d");

	ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);

	return canvas.toDataURL("image/jpeg");
};
