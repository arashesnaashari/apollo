import dbConnect from "../../utils/dbConnect";
const User = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
dbConnect();
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const existingUser = await User.findOne({
        phone: req.body.phone,
      });
      if (existingUser) {
        res.status(400).json({ msg: "this acccount has been used" });
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 12);

      const user = new User({
        phone: req.body.phone,
        username: req.body.username, //aaaaa
        password: hashedPassword, //3333333
      });

      const result = await user.save();

      res.status(200).json({ msg: result });
    } catch (error) {
      res.status(400).json({ msg: error });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
