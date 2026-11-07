
const db = require('better-sqlite3')('banco.db');

// Função de controle de cadastro de usuários
function cadastrarUsuario(telegram_id, nome, username, tipo) {

    // Verifica se o usuário já existe
    const usuario = db.prepare(`
        SELECT * FROM usuarios
        WHERE telegram_id = ?
    `).get(telegram_id);

    if (usuario) {
        return 'Conta já vinculada.';
    }

    // Cadastra um novo usuário
    db.prepare(`
        INSERT INTO usuarios (telegram_id, nome, username, tipo)
        VALUES (?, ?, ?, ?)
    `).run(telegram_id, nome, username, tipo);

    return 'Usuário cadastrado com sucesso!';
}

// Consulta os usuários cadastrados
const usuarios = db.prepare(`
    SELECT id, telegram_id, nome, username, tipo, ativo
    FROM usuarios
`).all();

console.log('Usuários encontrados no banco:');
console.table(usuarios);
