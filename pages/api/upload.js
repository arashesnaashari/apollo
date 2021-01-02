import nc from "next-connect";
import multer from "multer";
const upload = multer({ dest: "/tmp" });
const { cloudinary } = require("../../utils/cloadinary");
const handler = nc();

handler.post(upload.single("profilePicture"), async (req, res) => {
  const image = await cloudinary.uploader.upload(req.file.path, {
    width: 100,
    height: 100,
    crop: "fill",
  });
  res.status(200).json({
    success: 1,
    file: {
      url: image.secure_url,
    },
  });
  // try {
  //   const fileStr = req.body.data;
  //   const uploadResponse = await cloudinary.uploader.upload(fileStr, {
  //     upload_preset: "ml_default",
  //   });
  //   console.log(uploadResponse);
  //   res.json({
  //     success: 1,
  //     url: uploadResponse.url,
  //   });
  // } catch (err) {
  //   console.error(err);
  //   res.status(500).json({ err: "Something went wrong" });
  // }
});
export const config = {
  api: {
    bodyParser: false,
  },
};
export default handler;
