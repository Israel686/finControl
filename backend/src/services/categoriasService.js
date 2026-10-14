import pool from '../dataBase/db.js'

export async function todasCategorias() {
    const resultado = await pool.query(`SELECT * FROM categorias`);

    return resultado.rows;
}

export async function criarCategoria(dados) {
    const { nome } = dados;

    const resultado = await pool.query(
        "INSERT INTO categorias (nome) VALUES ($1) RETURNING *",
        [nome]
    );

    return resultado.rows[0];
}

