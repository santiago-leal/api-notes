const clodinary = require('cloudinary');

clodinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
    secure: true
});

async function uploadImage(file) {
    try {
        let result = await clodinary.v2.uploader.upload(file, {
            folder: 'ascensor-' + process.env.ENVIROMENT,
        });
        return result;
    } catch (error) {
        console.log(error);
    }
}

async function deleteImage(public_id) {
    try {
        let result = await clodinary.v2.uploader.destroy(public_id);
        return result;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    uploadImage,
    deleteImage
}