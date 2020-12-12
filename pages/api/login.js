
import dbConnect from "../../utils/dbConnect";
const User = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
dbConnect();
export default async function handler(req, res) {
 
    try {
        const Ouser = await User.findOne({ username: req.body.username });
      if (!Ouser) {
        res.status(400).json({ msg: "we havent you" });
      }
      const isEqual = await bcrypt.compare(req.body.password, Ouser.password);
      if (!isEqual) {
        res.status(400).json({ msg: "password wrong" });
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

      res.status(200).json({ msg: data });
    } catch (error) {
      res.status(400).json({ msg: error });
    }
  } 

