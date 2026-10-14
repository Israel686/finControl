import { no } from "zod/v4/locales";
import { criarCategoria, todasCategorias } from "../services/categoriasService.js"

export default async function Catergoriasroutes(app) {
    app.get("/categorias", async (request, reply) => {
        const result = await todasCategorias();

        return result.rows;
    });

    app.post("/categorias", async (request, reply) => {
        const novaCategoria = await criarCategoria(request.body);

        return reply.code(201).send(novaCategoria);
    });
}