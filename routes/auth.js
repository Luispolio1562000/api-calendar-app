/**
 * * Rutas de Usuario / Auth
 *! hots + /api/auth
 */

const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const {
  registerUser,
  loginUser,
  renewToken,
} = require("../controllers/auth/auth");
const { fieldValidator } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validateJWT");
router.get("/", (req, res) => {
  res.json({
    ok: true,
    msg: "get Auth",
  });
});

router.post(
  "/register",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check(
      "password",
      "El password debe de ser de minimo 6 caracteres"
    ).isLength({ min: 6 }),
    fieldValidator,
  ],
  registerUser
);

router.post(
  "/login",
  [
    check("email", "El email es obligatorio").isEmail(),
    check(
      "password",
      "El password debe de ser de minimo 6 caracteres"
    ).isLength({ min: 6 }),
    fieldValidator,
  ],
  loginUser
);

//? Generara un JWT.
router.get("/renew", validateJWT, renewToken);

module.exports = router;

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 token:
 *                   type: string
 *       400:
 *         description: Datos incorrectos
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado
 *       400:
 *         description: Datos incorrectos
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/auth/renew:
 *   get:
 *     summary: Renovar token de autenticación
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token renovado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 token:
 *                   type: string
 *                 name:
 *                   type: string
 *                 uid:
 *                   type: string
 *       401:
 *         description: Token no válido o expirado
 *       500:
 *         description: Error del servidor
 */
