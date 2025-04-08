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
  ],
  loginUser
);

//? Generara un JWT.
router.get("/renew", renewToken);

module.exports = router;
