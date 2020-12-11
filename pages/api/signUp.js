import dbConnect from "../../utils/dbConnect";
const User = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const existingUser = await User.findOne({
        phone: req.body.phone,
      });
      if (existingUser) {
        throw new Error("User exists already.");
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 12);

      const user = new User({
        phone: req.body.phone,
        username: req.body.username, //aaaaa
        password: hashedPassword, //3333333
      });

      const result = await user.save();

      res.send(result);
    } catch (error) {
      res.send(error);
    }
  } else {
    console.log("d");
  }
}
// export const handler = async (req, res) => {

// };
