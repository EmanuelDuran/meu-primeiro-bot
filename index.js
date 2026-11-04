const TelegramBot = require('node-telegram-bot-api');

const token = '8801610663:AAFuaTSQxN5mFc_iYGqneLevn4JbqX9OyIg';

const bot = new TelegramBot(token, {
    polling: true
});

console.log('🤖 Bot iniciado!');