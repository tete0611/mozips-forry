const { Events } = require('discord.js');
const clientId = process.env.PAPAGO_ID;
const clientSecret = process.env.PAPAGO_SECRET;
const request = require('request');
const { onPapagoError } = require('../../common/function');

module.exports = {
  name: Events.MessageCreate,
  once: false,
  /**
   *
   * @param {import('discord.js').Message} message
   */
  async execute(message) {
    if (message.content.startsWith('!번역 ')) {
      const { content } = message;
      const originMessage = content.slice(4).trim();
      const options = {
        url: 'https://openapi.naver.com/v1/papago/n2mt',
        form: { source: 'auto', target: 'ko', text: originMessage },
        headers: { 'x-naver-client-id': clientId, 'x-naver-client-secret': clientSecret },
      };
      request.post(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
          const translatedText = JSON.parse(body).message.result.translatedText;
          message.reply({
            content: translatedText,
            options: { ephemeral: true },
            target: message.author,
          });
        } else {
          message.reply({
            content: '오류 : ' + onPapagoError(response),
          });
          console.log('papagoError : ' + response.body);
        }
      });
    }
  },
};
