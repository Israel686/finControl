import fastify from "fastify";
import Categoriasroutes from "../src/routes/categorias.js"
import MovimentacoesRotas from "./routes/movimentacoes.js";

export const app = fastify()

app.register(Categoriasroutes)
app.register(MovimentacoesRotas)