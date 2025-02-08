const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log(cloudinary.config());

const productPhotosStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Amazon/products', // Folder for product photos
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'], // Allowed file formats
  },
});




const deleteProductByUrl = async (photoUrl) => {
  const publicId = photoUrl
    .split('/image/upload/')[1] // Get everything after "/image/upload/"
    .split('.')[0] // Remove the file extension
    .split('/')
    .slice(1) // Remove the leading slash
    .join('/');
  console.log(publicId);
  try {
    // Delete the image from Cloudinary
    await cloudinary.uploader.destroy(publicId);
    console.log('Previous photo successfully deleted from Cloudinary.');
  } catch (err) {
    console.error('Error deleting previous photo from Cloudinary:', err);
  }
};

// Multer upload middlewares
const uploadProductPhotos = multer({ storage: productPhotosStorage });

module.exports = { uploadProductPhotos, deleteProductByUrl };
