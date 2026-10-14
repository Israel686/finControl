// Considerando que db.js usa export default pool:
import pool from "../dataBase/db.js";

export async function novaMovimentacao(move) {
    const { nome, tipo, valor, data, categoria_id } = move;

    const verificarCategoria = await pool.query(
        "SELECT id FROM categorias WHERE id = $1",
        [categoria_id]
    );

    if (verificarCategoria.rows.length === 0) {
        const erro = new Error("Categoria não cadastrada");
        erro.statusCode = 404;
        throw erro;
    }

    const resultado = await pool.query(
        `INSERT INTO movimentacoes
            (nome, valor, tipo, data, categoria_id)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [nome, valor, tipo, data, categoria_id]
    );

    return resultado.rows[0];
}

export async function todasMovimentacoes() {
    const resultado = await pool.query(
        "SELECT * FROM movimentacoes"
    );

    return resultado.rows;
}

export async function removerMovimentacao(move) {
    const { id } = move;

    const resultado = await pool.query(
        "DELETE FROM movimentacoes WHERE id = $1 RETURNING *",
        [id]
    );

    if (resultado.rows.length === 0) {
        const erro = new Error("Movimentação não encontrada");
        erro.statusCode = 404;
        throw erro;
    }

    return resultado.rows[0];
}

export async function alterarMovimentacao(move) {
    const { id, nome, tipo, valor, data, categoria_id } = move;

    const verificarCategoria = await pool.query(
        "SELECT id FROM categorias WHERE id = $1",
        [categoria_id]
    );

    if (verificarCategoria.rows.length === 0) {
        const erro = new Error("Categoria não cadastrada");
        erro.statusCode = 404;
        throw erro;
    }

    const resultado = await pool.query(
        `UPDATE movimentacoes
         SET nome = $1,
             valor = $2,
             tipo = $3,
             data = $4,
             categoria_id = $5
         WHERE id = $6
         RETURNING *`,
        [nome, valor, tipo, data, categoria_id, id]
    );

    if (resultado.rows.length === 0) {
        const erro = new Error("Movimentação não encontrada");
        erro.statusCode = 404;
        throw erro;
    }

    return resultado.rows[0];
}