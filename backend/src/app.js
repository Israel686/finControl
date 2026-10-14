import fastify from "fastify";
import Categoriasroutes from "../src/routes/categorias.js"

export const app = fastify()

app.register(Categoriasroutes)