import nc from "next-connect";
import multer from "multer";
import dbConnect from "../../utils/dbConnect";
import User from "../../models/user";

const upload = multer({ dest: "/tmp" });
const { cloudinary } = require("../../utils/cloadinary");
const handler = nc();

dbConnect();
handler.post(upload.single("profilePicture"), async (req, res) => {
  const image = await cloudinary.uploader.upload(req.file.path, {
    width: 100,
    height: 100,
    crop: "fill",
  });
  if (req.body.userId) {
    const UpdatedUser = await User.findByIdAndUpdate(req.body.userId, {
      $set: {
        profileURL: image.secure_url,
      },
    });
    const result = await UpdatedUser.save();
  }
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
