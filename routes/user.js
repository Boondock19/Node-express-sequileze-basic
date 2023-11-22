const { Router } = require("express");
const { validarJWT } = require("../middlewares/validarJWT");
const validator = require("../validators/user.validator");
const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
} = require("../controllers/user");

const router = Router();

router.get("/", validarJWT,usuariosGet);

router.put("/:id", validarJWT,validator.userUpdateValidator,usuariosPut);

router.post("/", validarJWT,validator.userCreateValidator,usuariosPost);

router.delete("/:id", validarJWT, usuariosDelete);

module.exports = router;
