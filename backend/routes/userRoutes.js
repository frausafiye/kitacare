/** @format */

const express = require("express");
const router = express.Router();
const cors = require("cors");
const auth = require("../middlewares/authentication");

const {
  getManagers,
  getManager,
  getTeachers,
  getTeacher,
} = require("../controllers/userControllers/getControllers");
const {
  addManager,
  addTeacher,
  login,
} = require("../controllers/userControllers/postControllers");
const {
  deleteManager,
  deleteTeacher,
} = require("../controllers/userControllers/deleteControllers");
const {
  updateUser,
  deleteUsersGroup,
} = require("../controllers/userControllers/putControllers");
//GET:
//users/manager
//users/managers
router.get("/manager/:id", getManager); //:manager id
router.get("/managers/:id", getManagers); //:kgId

//users/teacher
//users/teachers
router.get("/teacher/:id", getTeacher); //:teacher id
router.get("/teachers/:id", getTeachers); //:kgId

//POST:
router.post("/manager", addManager);
router.post("/teacher", addTeacher);
router.post("/login", login);

//PUT:
router.put("/users/:id", updateUser);
router.put("/userGroup/:id", deleteUsersGroup);

//DELETE
router.delete("/managers/:id", deleteManager);
router.delete("/teachers/:id", deleteTeacher);

module.exports = router;
