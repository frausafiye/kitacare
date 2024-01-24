const fs = require("fs");
const { v4 } = require("uuid");
const multer = require("multer");
const ImagesCollection = require("../model/imageSchema");

const fileUploadService = async (req, res, next) => {
  try {
    console.log("fileUploadService");

    //handleFileUploadMongoDB(file);
    const prom = new Promise(async (resolve, reject) => {
      const { createReadStream, filename, mimetype } = await file;
      console.log("createReadStream");
      console.log(createReadStream);
      const key = v4();
      const stream = createReadStream();
      let chunks = [];
      for await (let chunk of stream) {
        chunks.push(chunk);
      }
      const Image = new ImagesCollection({
        filename: `${key}_${filename}`,
        imageUrl: `http://localhost:4000/db/images/${key}_${filename}`,
        data: Buffer.concat(chunks),
      });
      await Image.save();
      resolve(Image);
    });
    next();
  } catch (err) {
    res.status(401).send({ success: false, message: err.message });
  }
};

//module.exports = fileUploadService;
module.exports = multer({ fileUploadService });
