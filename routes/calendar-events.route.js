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

/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       required:
 *         - title
 *         - start
 *         - end
 *       properties:
 *         id:
 *           type: string
 *           description: ID del evento
 *         title:
 *           type: string
 *           description: Título del evento
 *         notes:
 *           type: string
 *           description: Notas adicionales
 *         start:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora de inicio
 *         end:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora de finalización
 *         user:
 *           type: string
 *           description: ID del usuario que creó el evento
 */

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Obtener todos los eventos
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de eventos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 events:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Event'
 *       401:
 *         description: No autorizado, token no válido
 *       500:
 *         description: Error del servidor
 *
 *   post:
 *     summary: Crear un nuevo evento
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       201:
 *         description: Evento creado
 *       400:
 *         description: Datos incorrectos
 *       401:
 *         description: No autorizado, token no válido
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/events/{id}:
 *   get:
 *     summary: Obtener un evento por ID
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del evento
 *     responses:
 *       200:
 *         description: Detalles del evento
 *       401:
 *         description: No autorizado, token no válido
 *       404:
 *         description: Evento no encontrado
 *       500:
 *         description: Error del servidor
 *
 *   put:
 *     summary: Actualizar un evento
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del evento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       200:
 *         description: Evento actualizado
 *       401:
 *         description: No autorizado, token no válido
 *       404:
 *         description: Evento no encontrado
 *       500:
 *         description: Error del servidor
 *
 *   delete:
 *     summary: Eliminar un evento
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del evento
 *     responses:
 *       200:
 *         description: Evento eliminado
 *       401:
 *         description: No autorizado, token no válido
 *       404:
 *         description: Evento no encontrado
 *       500:
 *         description: Error del servidor
 */
