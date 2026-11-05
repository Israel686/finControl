import {
    criarCategoria,
    todasCategorias
} from "../services/categoriasService.js";

export default async function categoriasRoutes(app) {
    app.get("/categorias", async (request, reply) => {
        const categorias = await todasCategorias();

        return reply.code(200).send(categorias);
    });

    app.post("/categorias", async (request, reply) => {
        const nome = request.body?.nome;

        if (typeof nome !== "string" || nome.trim() === "") {
            return reply.code(400).send({
                mensagem: "Informe o nome da categoria"
            });
        }

        const novaCategoria = await criarCategoria({
            nome: nome.trim()
        });

        return reply.code(201).send(novaCategoria);
    });
}