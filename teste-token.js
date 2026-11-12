require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');

const token = (process.env.BOT_TOKEN || '').trim();
console.log('Token carregado:', Boolean(token));
console.log('Formato correto:', /^\d+:[A-Za-z0-9_-]+$/.test(token));
console.log('Quantidade de caracteres:', token.length);

if (!token) {
    console.log('Token não encontrado no arquivo .env');
    process.exit(1);
}

const bot = new TelegramBot(token);

bot.getMe()
    .then((info) => {
        console.log('Token válido!');
        console.log('Bot encontrado: @' + info.username);
    })
    .catch((erro) => {
        console.log('Falha ao validar o token.');
        console.log('Código HTTP:', erro.response?.statusCode);
        console.log(
            'Detalhe:',
            erro.response?.body?.description || erro.message
        );
    });