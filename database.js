const Database = require('better-sqlite3');

// Conecta ao banco SQLite
const db = new Database('banco.db');
db.pragma('foreign_keys = ON');

console.log('Banco SQLite conectado com sucesso!');

// Tabela de produtos
db.exec(`
    CREATE TABLE IF NOT EXISTS produtos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        categoria TEXT,
        quantidade REAL DEFAULT 0,
        preco_compra REAL DEFAULT 0,
        preco_venda REAL DEFAULT 0,
        estoque_minimo REAL DEFAULT 0,
        observacoes TEXT,
        data_cadastro TEXT DEFAULT CURRENT_TIMESTAMP
    );
`);

console.log('Tabela produtos criada com sucesso!');

// Tabela de usuários
db.exec(`
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        telegram_id INTEGER NOT NULL UNIQUE,
        nome TEXT NOT NULL,
        username TEXT,
        tipo TEXT DEFAULT 'USUARIO',
        ativo INTEGER DEFAULT 1,
        data_cadastro TEXT DEFAULT CURRENT_TIMESTAMP
    );
`);

console.log('Tabela usuarios criada com sucesso!');


//Tabela de compras
db.exec(`CREATE TABLE IF NOT EXISTS compras (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario INTEGER NOT NULL,
    data_compra TEXT DEFAULT CURRENT_TIMESTAMP,
    valor_total REAL DEFAULT 0,
    fornecedor TEXT,
    observacoes TEXT, 

    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);
`);

console.log('Tabela compras criada com sucesso!');

//Tabela de itens_compra
db.exec(`CREATE TABLE IF NOT EXISTS itens_compra (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_compra INTEGER NOT NULL,
    id_produto INTEGER NOT NULL,
    quantidade REAL NOT NULL, 
    preco_unitario REAL NOT NULL,
    subtotal REAL NOT NULL,

    FOREIGN KEY(id_compra) REFERENCES compras(id),
    FOREIGN KEY(id_produto) REFERENCES produtos(id)
    );
    `);

    console.log('Tabela itens_compra criada com sucesso!');

    //Tabela de vendas
    db.exec(`CREATE TABLE IF NOT EXISTS vendas (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     id_usuario INTEGER NOT NULL,
     data_venda TEXT DEFAULT CURRENT_TIMESTAMP,
     valor_total REAL NOT NULL DEFAULT 0,
     forma_pagamento TEXT,
     observacoes TEXT,
     
     FOREIGN KEY(id_usuario) REFERENCES usuarios(id)
        )`);

    console.log('Tabela vendas criada com sucesso!');

    //Tabela de itens_vendas
    db.exec(`CREATE TABLE IF NOT EXISTS itens_venda (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_venda INTEGER NOT NULL,
    id_produto INTEGER NOT NULL,
    quantidade REAL NOT NULL,
    preco_unitario REAL NOT NULL,
    subtotal REAL NOT NULL,

    FOREIGN KEY(id_venda) REFERENCES vendas(id),
    FOREIGN KEY(id_produto) REFERENCES produtos(id)
        );`);

    console.log('Tabela itens_venda criada com sucesso!');

    /*TEXT DEFAULT CURRENT_TIMESTAMP = AAAA-MM-DD HH:MM:SS Horário atual do banco de dados (SQLite) */
    //Tabela movimentacoes_financeiras
    db.exec(`CREATE TABLE IF NOT EXISTS movimentacoes_financeiras(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_usuario INTEGER NOT NULL,
        tipo TEXT NOT NULL,
        categoria TEXT,
        valor REAL NOT NULL,
        data_movimentacao TEXT DEFAULT CURRENT_TIMESTAMP, 
        descricao TEXT,
        
        FOREIGN KEY(id_usuario) REFERENCES usuarios(id)
        );`);

console.log('Tabela movimentacoes_financeiras criada com sucesso!');

//Tabela movimentacoes_estoque
db.exec(`CREATE TABLE IF NOT EXISTS movimentacoes_estoque(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_produto INTEGER NOT NULL,
    id_usuario INTEGER NOT NULL,
    tipo TEXT NOT NULL,
    quantidade REAL NOT NULL,
    data_movimentacao TEXT DEFAULT CURRENT_TIMESTAMP,
    descricao TEXT,

    FOREIGN KEY(id_produto) REFERENCES produtos(id),
    FOREIGN KEY(id_usuario) REFERENCES usuarios(id)
    );`);
  
console.log('Tabela movimentacoes_estoque criada com sucesso!');

db.exec(`CREATE TABLE IF NOT EXISTS historico_alteracoes(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario INTEGER NOT NULL,
    acao TEXT NOT NULL,
    tabela_afetada TEXT NOT NULL,
    id_registro INTEGER NOT NULL,
    detalhes TEXT NOT NULL,
    data_alteracao TEXT DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
    );
`)    
console.log('Tabela historico_alteracoes criada com sucesso!');

// CONSULTAR AS TABELAS CRIADAS NO BANCO;
const tabelas = db.prepare(`
    SELECT name
    FROM sqlite_master
    WHERE type = 'table'
    ORDER BY name;
    `).all();

    console.log('Tabelas existentes no banco:');
    console.table(tabelas);
