const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "bookgram",
  api_key: "364325366326891",
  api_secret: "7sHNddcFjZQOVZaWJCg2NUfx2Lo",
});

module.exports = { cloudinary };

// cloudinary.uploader.upload("sample.jpg", {"crop":"limit","tags":"samples","width":3000,"height":2000}, function(result) { console.log(result) });

//blog :
// https://github.com/BomdiZane/EditorJS-React-Renderer

// https://github.com/moveyourdigital/editorjs-blocks-react-renderer

/////////////////

//upload :
// https://code.tutsplus.com/tutorials/file-upload-with-multer-in-node--cms-32088

// https://medium.com/javascript-in-plain-english/uploading-files-using-multer-on-server-in-nodejs-and-expressjs-5f4e621ccc67

// https://www.youtube.com/watch?v=KQ_ty4A6Nsc

// https://miro.medium.com/max/2880/1*0Tm_TqZ9vk54nckLSy_GTw.png

//insta
// https://medium.com/@03balogun/building-an-instagram-bot-using-nodejs-puppeteer-and-firebase-28ebb93784d6
