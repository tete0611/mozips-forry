const { Events } = require('discord.js');
const express = require('express');
const app = express();
const clientId = process.env.PAPAGO_ID;
const clientSecret = process.env.PAPAGO_SECRET;
const request = require('request');

module.exports = {
  name: Events.MessageCreate,
  once: false,
  /**
   *
   * @param {import('discord.js').Message} message
   */
  async execute(message) {
    if (message.content.startsWith('!번역')) {
      console.log('번역호출완료');
      app.get('/translate', (req, res) => {
        const options = {
          url: 'https://openapi.naver.com/v1/papago/n2mt',
          form: { source: 'en', target: 'en', text: message.content },
          headers: { 'X-Naver-Client-Id': clientId, 'X-Naver-Client-Secret': clientSecret },
        };
        request.post(options, (error, response, body) => {
          if (!error && response.statusCode == 200) {
            console.log(JSON.parse(body));
            res.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' });
            res.end(body);
          } else {
            res.status(response.statusCode).end();
            console.log('papagoError : ' + response.statusCode);
          }
        });
        app.listen(3000, () => {
          console.log('http://127.0.0.1:3000/translate app listening on port 3000!');
        });
      });
    }
  },
};
