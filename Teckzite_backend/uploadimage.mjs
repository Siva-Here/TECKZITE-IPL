// require('dotenv').config()
// const cloudinary = require('cloudinary').v2;
// const pLimit = require('p-limit');

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const images = [
//  'https://www.bing.com/ck/a?!&&p=54f4a1f1ff8710210a2bfd699d2bf1dfbd5970f2f8502e51ff67f8a439dfad3eJmltdHM9MTczNjU1MzYwMA&ptn=3&ver=2&hsh=4&fclid=22e6cc65-ae15-608c-0121-c3b8afb861e1&u=a1L2ltYWdlcy9zZWFyY2g_cT1yY2IlMjBsb2dvJkZPUk09SVFGUkJBJmlkPTVGRUU4NjQ4M0NGNDQ3NDFBRjc0REJDNjQzMjQwMDA3REFGMTdBMTY&ntb=1'
// ];

// (async function run() {

//   // Example using a simple for loop

//   // for ( const image of images ) {
//   //   const result = await cloudinary.uploader.upload(image);
//   //   console.log(`Successfully uploaded ${image}`);
//   //   console.log(`> Result: ${result.secure_url}`);
//   // }

//   // Example with paralell uploads and concurrency
//   // Default Cloudinary upload limit for the free tier is 10
//   const limit = pLimit(2);

//   const imagesToUpload = images.map((image) => {
//     return limit(async () => {
//       const result = await cloudinary.uploader.upload(image);
//       console.log(`Successfully uploaded ${image}`);
//       console.log(`> Result: ${result.secure_url}`);
//       return result;
//     })
//   });

//   await Promise.all(imagesToUpload);
// })();
import dotenv from 'dotenv';
import cloudinary from 'cloudinary';
import pLimit from 'p-limit';

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const images = [
  'https://upload.wikimedia.org/wikipedia/commons/6/6d/Windows_Settings_app_icon.png',
];

(async function run() {
  try {
    const limit = pLimit(2); // Set concurrency limit to 2

    const imagesToUpload = images.map((image) => {
      return limit(async () => {
        const result = await cloudinary.v2.uploader.upload(image);
        console.log(`Successfully uploaded ${image}`);
        console.log(`> Result: ${result.secure_url}`);
        return result;
      });
    });

    const results = await Promise.all(imagesToUpload);
    console.log('All images uploaded successfully!');
    console.log(results);
  } catch (error) {
    console.error('Error uploading images:', error.message);
  }
})();
