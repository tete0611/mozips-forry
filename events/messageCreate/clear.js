const { Events } = require('discord.js');
const { checkRole } = require('../../common/function');

module.exports = {
  name: Events.MessageCreate,
  once: false,
  /**
   *
   * @param {import('discord.js').Message} message
   */
  async execute(message) {
    // if (message.content !== '!채팅삭제') return;
    // if (!checkRole(message.member, 'Manager')) return;
    // const { channel } = message;
    // const messages = await channel.messages.fetch();
    // try {
    //   await channel.bulkDelete(messages);
    // } catch (error) {
    //   console.log(error);
    // }
  },
};
