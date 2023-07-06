const mongoose = require("mongoose");
const { Schema } = mongoose;

const ImageSchema = new Schema({
  filename: { type: String },
  imageUrl: { type: String },
  //data: { type: Buffer },
  img: { data: Buffer, contentType: String },
});

const ImagesCollection = mongoose.model("images", ImageSchema);
module.exports = ImagesCollection;
