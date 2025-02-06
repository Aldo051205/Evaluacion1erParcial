import { Router } from "express";
import { login, register, mostrarUsuarios, buscarPorId, borrarPorId, editarPorId } from "../db/usuariosDB.js";
const router = Router();

router.post("/registro", async(req, res)=>{
    const respuesta = await register(req.body);
    console.log(respuesta.mensajeOriginal);
    res.cookie("token", respuesta.token).status(respuesta.status).json(respuesta.mensajeUsuario);
});

router.post("/login", async(req, res)=>{
    const respuesta = await login(req.body);
    console.log(respuesta.mensajeOriginal);
    res.cookie("token",respuesta.token).status(respuesta.status).json(respuesta.mensajeUsuario);
});

router.get("/mostrarUsuarios", async (req, res) => {
    const respuesta = await mostrarUsuarios();  
    console.log("Usuarios obtenidos:", respuesta.mensajeOriginal); 
    res.status(respuesta.status).json(respuesta);
});


router.get("/buscarPorId/:id", async (req, res) => {
    const respuesta = await buscarPorId(req.params.id); 
    console.log(respuesta.mensajeOriginal);
    res.cookie("token", respuesta.token).status(respuesta.status).json(respuesta.mensajeUsuario);
});


router.delete("/borrarPorId/:id", async(req, res)=>{
    const respuesta = await borrarPorId(req.params.id);
    console.log(respuesta.mensajeOriginal);
    res.cookie("token", respuesta.token).status(respuesta.status).json(respuesta.mensajeUsuario);
})

router.put("/editarPorId/:id", async (req, res) => {
    const respuesta = await editarPorId(req.params.id, req.body);  
    console.log(respuesta.mensajeOriginal);
    res.cookie("token", respuesta.token).status(respuesta.status).json(respuesta.mensajeUsuario);
});


router.get("/salir", async(req, res)=>{
    res.json(" Estás en salir");
});

router.get("/usuariosLogueados", async(req, res)=>{
    res.json("Usuarios convencionales y administradores logueados");
});

router.get("/administradores", async(req, res)=>{
    res.json("Solo administradores logueados pueden entrar");
});

router.get("/cualquierUsuario", async(req, res)=>{
    res.json("Todos pueden entrar");
});

export default router;