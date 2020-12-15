import Cors from "cors";
import initMiddleware from "../../lib/init-middleware";
import dbConnect from "../../utils/dbConnect";
import User from "../../models/user";
import bcrypt from "bcrypt";
dbConnect();
// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ["GET", "POST", "OPTIONS"],
  })
);

export default async function handler(req, res) {
  // Run cors
  await cors(req, res);

  try {
    const existingUser = await User.findOne({
      phone: req.body.phone,
    });
    if (existingUser) {
      res.status(404).json({ msg: "404" });
      return;
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const user = new User({
      phone: req.body.phone,
      username: req.body.username, //aaaaa
      password: hashedPassword, //3333333
    });

    const result = await user.save();

    res.status(201).json({ msg: "Succ" });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
}
