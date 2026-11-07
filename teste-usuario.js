const db = require('better-sqlite3')('banco.db');

/*const cadastrarUsuario = db.prepare(`INSERT INTO usuarios (telegram_id, nome, username, tipo)
    VALUES (?, ?, ?, ?)
    `);

    console.log('Comando de cadastro preparado!');

    const resultado = cadastrarUsuario.run(
        8754558009,
        'Emanuel',
        'Emanuel_Duran',
        'ADMIN'
    );

    console.log('Usuário cadastrado!');
    console.log('ID interno:', resultado.lastInsertRowid);

    const resultado2 = cadastrarUsuario.run(
        7629127582,
    'Maria Eduarda',
    'Rodrigues_1509',
    'ADMIN');

    console.log('Usuário cadastrado!');*/
    //console.log('ID interno:', resultado2.lastInsertRowid);

    const usuario = db.prepare(`
        SELECT id, telegram_id, nome, username, tipo, ativo
        FROM usuarios
        `).all();

        const resultado = cadastrarUsuario(
    12345679012,
    'Junior Teste',
    'Junior_teste',
    'USUARIO'
);

console.log(resultado);

        console.log('Usuário encontrado no banco:');
        console.table(usuario); 

//Função de controle de login de usuários novos

function cadastrarUsuario(telegram_id, nome, username, tipo){
    

    const usuario = db.prepare(`
        SELECT * FROM usuarios
        WHERE telegram_id = ?
        `).get(telegram_id);

        if (usuario) {
            return 'Conta já vinculada.';
        }

        db.prepare(`
            INSERT INTO usuarios (telegram_id, nome, username, tipo)
            VALUES (?, ?, ?, ?)
            `).run(telegram_id, nome, username, tipo);

            return 'Usuário cadastrado com sucesso!';
};
