require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN;

if (!token) {
    throw new Error('Token do bot não encontrado!');
}

const bot = new TelegramBot(token, {
    polling: true
});

console.log('🤖 Bot iniciado!');