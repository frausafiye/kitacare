const UserModel = require("../../../model/userModel");
const mongoose = require("mongoose");

exports.getUserImg = async (req, res, next) => {
  try {
    const action = async function (err, collection) {
      // Locate all the entries using find
      console.log("action");
      console.log(req.params.url);
      const image = await collection.findOne({ filename: req.params.url });
      if (image) {
        console.log(image);
        console.log("file id:" + image._id);
        //find chunks from images.chunks collection:
        mongoose.connection.db.collection(
          "images.chunks",
          (err, collection2) => {
            collection2
              .find({ files_id: image._id })
              .toArray(function (error, chunks) {
                if (error) {
                  console.log(err.message);
                  res.send({ success: false, message: error.message });
                }
                res.send({ success: true, img: chunks });
              });
          }
        );
      } else {
        res.send({ success: false, message: "no image found in db" });
      }
    };

    mongoose.connection.db.collection("images.files", action);

    //   if (image) {
    //     const readStream = stream.Readable.from(image.data);
    //     readStream.pipe(res);
    //user.img is only the url of the img
    //       user.img
    //         ? res.send({ success: true, img: user.img })
    //         : res.send({ success: false, message: "no image found" });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};
