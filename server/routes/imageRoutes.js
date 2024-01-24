const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/authentication");
const uploadImg = require("../middlewares/uploadImg");
const storeImg = require("../middlewares/storeImg");
const {
  uploadImage,
  storeImage,
} = require("../controllers/imageControllers/userProfileImages/postControllers");
const {
  getUserImg,
} = require("../controllers/imageControllers/userProfileImages/getControllers");

router.get("/getUserImg/:url", getUserImg);
//router.get("/uploadImg", auth, uploadImage);
//router.post("/uploadImg", auth, storeImg, storeImage);

//router.post("/uploadImg/:id", uploadImg.single("file"), uploadImage);
router.post("/uploadImg", auth, uploadImg.single("file"), uploadImage);

module.exports = router;
