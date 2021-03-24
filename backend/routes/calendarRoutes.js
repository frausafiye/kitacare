const express = require("express");
const router = express.Router();
const {
  getAllEvents,
  getSingleEvent,
} = require("../controllers/calendarControllers/getControllers");
const {
  postNewEvent,
} = require("../controllers/calendarControllers/postControllers");
const {
  deleteSingleEvent,
} = require("../controllers/calendarControllers/deleteControllers");
const {
  putUpdateEvent,
} = require("../controllers/calendarControllers/putControllers");

router.get("/getAllEvents", getAllEvents);
router.get("/:id", getSingleEvent);
router.post("/postNewEvent", postNewEvent);
router.put("/putUpdateEvent", putUpdateEvent);
router.delete("/:id", deleteSingleEvent);

/* DEFAULT EXPORT */
module.exports = router;