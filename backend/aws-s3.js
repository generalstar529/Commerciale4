const AWS = require("aws-sdk");
const bluebird = require("bluebird");

AWS.config.setPromisesDependency(bluebird);
AWS.config.update({
  accessKeyId: process.env.BUCKET_ACCESS_KEY,
  secretAccessKey: process.env.BUCKET_SECRET_KEY,
  region: process.env.BUCKET_REGION,
});

const s3 = new AWS.S3();

const uploadSingleImage = async (imageData, userId) => {
  let matches = imageData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  if (matches.length !== 3) {
    return { error: "imageUploadFailed" };
  }

  let imageType = matches[1];
  let imageBuffer = Buffer.from(matches[2], "base64");
  let extension = imageType.substr(6, imageType.length);
  let fileName = "image-" + Date.now() + "." + extension;

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: "company-" + userId + "/" + fileName, // type is not required
    Body: imageBuffer,
    ACL: "public-read",
    ContentEncoding: "base64", // required
    ContentType: imageType, // required. Notice the back ticks
  };

  try {
    const { Key } = await s3.upload(params).promise();
    return Key;
  } catch (error) {
    return { error: "imageUploadFailed" };
  }
};

const uploadMultiImages = async (images, userId) => {
  let keys = [];

  for (let image of images) {
    let matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

    if (matches) {
      if (matches.length !== 3) {
        return { error: "imageUploadFailed" };
      }
      let imageType = matches[1];
      let imageBuffer = Buffer.from(matches[2], "base64");
      let extension = imageType.substr(6, imageType.length);
      let fileName = "image-" + Date.now() + "." + extension;
      let params = {
        Bucket: process.env.BUCKET_NAME,
        Key: "company-" + userId + "/" + fileName, // type is not required
        Body: imageBuffer,
        ACL: "public-read",
        ContentEncoding: "base64", // required
        ContentType: imageType, // required. Notice the back ticks
      };
      try {
        const { Key } = await s3.upload(params).promise();
        keys.push(Key);
      } catch (error) {
        return { error: "imageUploadFailed" };
      }
    } else {
      keys.push(image);
    }
  }
  return keys;
};

const deleteImages = async (keys) => {
  for (let key of keys) {
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: key, //if any sub folder-> path/of/the/folder.ext
    };

    try {
      await s3.headObject(params).promise();
      try {
        await s3.deleteObject(params).promise();
      } catch (err) {
        return { error: "errorOccuredDelete" };
      }
    } catch (err) {
      return { error: "errorOccuredDelete" };
    }
  }

  return { sucess: "Deleted images successfully!" };
};

module.exports.uploadSingleImage = uploadSingleImage;
module.exports.uploadMultiImages = uploadMultiImages;
module.exports.deleteImages = deleteImages;
