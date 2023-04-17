const { Events, AttachmentBuilder } = require('discord.js');
const { checkRole } = require('../../common/function');

module.exports = {
  name: Events.MessageCreate,
  once: false,
  /**
   *
   * @param {import('discord.js').Message} message
   */
  async execute(message) {
    const { content, member, guild } = message;
    if (content === '!소개하기' && checkRole(member, 'Manager')) {
      const picture_1 = new AttachmentBuilder(
        'https://cdn.discordapp.com/attachments/1095518704994881636/1096326201070592030/intro_1.png',
      );
      const picture_2 = new AttachmentBuilder(
        'https://cdn.discordapp.com/attachments/1095518704994881636/1096326201309675570/intro_2.png',
      );
      const picture_3 = new AttachmentBuilder(
        'https://cdn.discordapp.com/attachments/1095518704994881636/1096326201510985819/intro_3.png',
      );
      const picture_4 = new AttachmentBuilder(
        'https://cdn.discordapp.com/attachments/1095518704994881636/1096326201729097829/intro_4.png',
      );
      const picture_5 = new AttachmentBuilder(
        'https://cdn.discordapp.com/attachments/1095518704994881636/1096326201955598386/intro_5.png',
      );
      const picture_6 = new AttachmentBuilder(
        'https://cdn.discordapp.com/attachments/1095518704994881636/1096326202190462996/intro_6.png',
      );
      const introChannel = guild.channels.cache.get(process.env.INTRO_CHANNEL_ID);
      await introChannel.send({
        files: [picture_1, picture_2, picture_3, picture_4, picture_5, picture_6],
      });
    }
  },
};
