const UserModel = require("../model/userModel");
const JWT = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
  try {
    const token = req.cookies["x-access-token"];

    const jwt = await JWT.verify(token, process.env.SECRET_KEY);
    const user = await UserModel.findById(jwt._id);

    if (!user) {
      throw "user not found";
    }

    req.userID = user._id;
    req.email = user.email;
    next();
  } catch (err) {
    res.status(401).send({ success: false, message: "Invalid token" });
  }
};
