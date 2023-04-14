const { Events, Colors } = require('discord.js');
const { welcomeEmbed } = require('../../components/welcome');
const { getRandomElement } = require('../../common/function');
const { env } = process;
const welcomeChannelId = env.WELCOME_CHANNEL_ID;

const colors = Object.values(Colors);

module.exports = {
  name: Events.MessageCreate,
  once: false,
  /**
   *
   * @param {import("discord.js").Message} message
   */
  async execute(message) {
    if (message.author.bot) return;
    if (message.channelId === welcomeChannelId) {
      const { channel } = message;
      const messages = await channel.messages.fetch({ limit: 5 });
      const botMessages = messages.filter(msg => msg.author.id === process.env.ID);
      const messagesToDelete = botMessages.filter(msg => msg.id !== message.id).map(msg => msg.id);
      if (messagesToDelete.length > 0) channel.bulkDelete(messagesToDelete);
      await channel.send({
        embeds: [welcomeEmbed.setColor(getRandomElement(colors))],
      });
    }
  },
};
