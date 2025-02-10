import { Router } from "express";
import { login, register, mostrarUsuarios, buscarPorId, borrarPorId, editarPorId } from "../db/usuariosDB.js";
import { usuarioAutorizado } from "../middlewares/funcionesPassword.js";

const router = Router();

const manejarRespuesta = (res, respuesta) => {
    console.log(respuesta.mensajeOriginal);
    res.cookie("token", respuesta.token || "")
       .status(respuesta.status)
       .json(respuesta.mensajeUsuario || respuesta);
};

// Rutas de autenticación
router.post("/registro", async (req, res) => manejarRespuesta(res, await register(req.body)));
router.post("/login", async (req, res) => manejarRespuesta(res, await login(req.body)));
router.get("/salir", (req, res) => res.cookie("token", "", { expires: new Date(0) }).status(200).json("Sesión cerrada correctamente"));

// Rutas de usuarios
router.get("/mostrarUsuarios", async (req, res) => manejarRespuesta(res, await mostrarUsuarios()));
router.get("/buscarPorId/:id", async (req, res) => manejarRespuesta(res, await buscarPorId(req.params.id)));
router.delete("/borrarPorId/:id", async (req, res) => manejarRespuesta(res, await borrarPorId(req.params.id)));
router.put("/editarPorId/:id", async (req, res) => manejarRespuesta(res, await editarPorId(req.params.id, req.body)));

// Rutas con permisos
router.get("/usuariosLogueados", usuarioAutorizado, (req, res) => res.json("Usuarios convencionales y administradores logueados"));
router.get("/administradores", (req, res) => res.json("Solo administradores logueados pueden entrar"));
router.get("/cualquierUsuario", (req, res) => res.json("Todos pueden entrar"));

export default router;
