import nc from "next-connect";
import multer from "multer";
const path = require("path");

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
});
const handler = nc();

handler.post(upload.single("profilePicture"), (req, res) => {
  //   upload(req, res, (err) => {
  //     if (err) {
  //       res.json({
  //         msg: err,
  //       });
  //     } else {
  //       if (req.file == undefined) {
  //         res.json({
  //           msg: "Error: No File Selected!",
  //         });
  //       } else {
  //         res.json({
  //           msg: "File Uploaded!",
  //           file: `uploads/${req.file.filename}`,
  //         });
  console.log(req.file);
  //   }
  // }
  //   });
});
export const config = {
  api: {
    bodyParser: false,
  },
};
export default handler;
