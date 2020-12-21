// const multer = require("multer");
// const path = require("path");

// // Set The Storage Engine
// const storage = multer.diskStorage({
//   destination: "./public/uploads/",
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

// // Init Upload
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 1000000 },
//   fileFilter: function (req, file, cb) {
//     checkFileType(file, cb);
//   },
// }).single("myFile");

// // Check File Type
// function checkFileType(file, cb) {
//   // Allowed ext
//   const filetypes = /jpeg|jpg|png|gif/;
//   // Check ext
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   // Check mime
//   const mimetype = filetypes.test(file.mimetype);

//   if (mimetype && extname) {
//     return cb(null, true);
//   } else {
//     cb("Error: Images Only!");
//   }
// }

// const uploadStorage = multer({ storage: storage });

// export default async function handler(req, res) {
//   upload(req, res, (err) => {
//     if (err) {
//       res.json({ msg: err });
//     } else {
//       if (req.file == undefined) {
//         res.json({
//           msg: "Error: No File Selected!",
//         });
//       } else {
//         res.json({
//           file: `uploads/${req.file.filename}`,
//         });
//         // console.log(req.file);
//       }
//     }
//   });
// }
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

import formidable from "formidable";
// import micro from "micro";

async function endpoint(req, res) {
  const data = await new Promise(function (resolve, reject) {
    const form = new formidable.IncomingForm({
      keepExtensions: true,
      uploadDir: "./public/uploads",
    });
    form.parse(req, function (err, fields, files) {
      if (err) return reject(err);
      res.status(200).send({ msg: files.file.path });

      resolve({ fields, files });
    });
  });
}
export const config = {
  api: {
    bodyParser: false,
  },
};
export default endpoint;
