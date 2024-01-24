const UserModel = require("../../../model/userModel");
const ImageModel = require("../../../model/imageSchema");

exports.uploadImage = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.userID);
    if (user) {
      console.log(req.file);
      //req.file.id is document id in the profile-photos.files collection!
      //in profile-photos.chunks collection containing the chunks having this id with the field name "fields_id" and having img data in "data" field!.
      if (req.file === undefined)
        return res
          .status(400)
          .send({ success: false, message: "you must select a file." });
      //const imgUrl = `http://localhost:8080/file/${req.file.filename}`;
      const imgUrl = req.file.filename;
      console.log(imgUrl);
      //update user's document:
      user.img = imgUrl;

      //user.img=req.file._id;
      user.save();
      console.log(user.img);
      return res.send({ success: true, imgUrl, user });
    } else {
      res
        .status(404)
        .send({ successs: false, message: "no matching user found" });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};
