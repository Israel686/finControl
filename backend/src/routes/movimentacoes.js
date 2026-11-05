import {
    todasMovimentacoes,
    novaMovimentacao,
    removerMovimentacao,
    alterarMovimentacao
} from "../services/movimentacoesService.js";

export default async function movimentacoesRotas(app) {
    app.get("/movimentacoes", async (request, reply) => {
        const resultado = await todasMovimentacoes();

        return reply.code(200).send(resultado);
    });

    app.post("/movimentacoes", async (request, reply) => {
        const resultado = await novaMovimentacao(request.body);

        return reply.code(201).send(resultado);
    });

    app.delete("/movimentacoes/:id", async (request, reply) => {
        const id = Number(request.params.id);

        if (!Number.isSafeInteger(id) || id <= 0) {
            return reply.code(400).send({
                mensagem: "O ID deve ser um número inteiro positivo"
            });
        }

        const resultado = await removerMovimentacao({ id });

        return reply.code(200).send(resultado);
    });

    app.put("/movimentacoes/:id", async (request, reply) => {
        const id = Number(request.params.id);

        if (!Number.isSafeInteger(id) || id <= 0) {
            return reply.code(400).send({
                mensagem: "O ID deve ser um número inteiro positivo"
            });
        }

        const resultado = await alterarMovimentacao({
            ...request.body,
            id
        });

        return reply.code(200).send(resultado);
    });
}