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
