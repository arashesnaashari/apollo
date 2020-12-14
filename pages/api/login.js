import dbConnect from "../../utils/dbConnect";
import User from "../../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
dbConnect();
export default async function handler(req, res) {
  try {
    const Ouser = await User.findOne({ username: req.body.username });
    if (!Ouser) {
      res.status(400).json({ msg: "we havent you" });
      return;
    }
    const isEqual = await bcrypt.compare(req.body.password, Ouser.password);
    if (!isEqual) {
      res.status(400).json({ msg: "password wrong" });
      return;
    }
    const token = jwt.sign(
      { userId: Ouser.id, username: Ouser.username },
      "somSuperKey",
      {
        expiresIn: "1h",
      }
    );
    const data = {
      userId: Ouser.id,
      token: token,
      tokenExpire: 1,
    };

    res.status(201).json({ msg: data });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
}
