const { Router } = require("express");
const { validateJWT } = require("../middlewares/validateJWT");
const {
  createEvent,
  getEventById,
  getEvents,
  deleteEvent,
  updateEvent,
} = require("../controllers/events/calendar-events.controller");

const router = Router();

router.get("/all-events", validateJWT, getEvents);
router.get("/event/:id", validateJWT, getEventById);
router.post("/new-event", validateJWT, createEvent);
router.put("/event/:id", validateJWT, updateEvent);
router.delete("/event/:id", validateJWT, deleteEvent);

module.exports = router;
