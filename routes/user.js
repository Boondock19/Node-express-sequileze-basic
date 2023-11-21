const { Router } = require("express");
const { validarJWT } = require("../middlewares/validarJWT");
const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
} = require("../controllers/user");

const router = Router();

router.get("/", validarJWT,usuariosGet);

router.put("/:id", validarJWT,usuariosPut);

router.post("/", validarJWT,usuariosPost);

router.delete("/:id", validarJWT, usuariosDelete);

module.exports = router;
