const db = require('better-sqlite3')('banco.db');

const cadastrarUsuario = db.prepare(`INSERT INTO usuarios (telegram_id, nome, username, tipo)
    VALUES (?, ?, ?, ?)
    `);

    console.log('Comando de cadastro preparado!');

   /* const resultado = cadastrarUsuario.run(
        8754558009,
        'Emanuel',
        'Emanuel_Duran',
        'ADMIN'
    );

    console.log('Usuário cadastrado!');
    console.log('ID interno:', resultado.lastInsertRowid);*/

    const usuario = db.prepare(`
        SELECT id, telegram_id, nome, username, tipo, ativo
        FROM usuarios
        `).all();

        console.log('Usuário encontrado no banco:');
        console.table(usuario);