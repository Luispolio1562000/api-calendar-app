const { Router } = require("express");
const { check, param } = require("express-validator");
const { fieldValidator } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validateJWT");
const { validateIsDate } = require("../helpers/validateIsDate");
const {
  createEvent,
  getEventById,
  getEvents,
  deleteEvent,
  updateEvent,
} = require("../controllers/events/calendar-events.controller");

const router = Router();
//? Validar JWT middleware para todas las rutas
router.use(validateJWT);
router.get(
  "/all-events",
  [check("title", "Se requiere el titulo").not().isEmpty()],
  getEvents
);
router.get("/event/:id", getEventById);
router.post(
  "/new-event",
  [
    check("title", "Se requiere el titulo").notEmpty(),
    check("start", "Se requiere la fecha de inicio").custom(validateIsDate),
    check("end", "Se requiere la fecha de fin").custom(validateIsDate),
    fieldValidator,
  ],
  createEvent
);
router.put(
  "/event/:id",
  [
    check("title", "Se requiere el titulo").notEmpty(),
    check("start", "Se requiere la fecha de inicio").custom(validateIsDate),
    check("end", "Se requiere la fecha de fin").custom(validateIsDate),
    param("id", "Se requiere el ID").notEmpty().isMongoId(),
    fieldValidator,
  ],
  updateEvent
);
router.delete(
  "/event/:id",
  [param("id", "Se requiere el ID").notEmpty().isMongoId(), fieldValidator],
  deleteEvent
);

module.exports = router;
