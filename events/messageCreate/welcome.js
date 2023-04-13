const { Events } = require('discord.js');
const { env } = process;
const welcomeChannelId = env.WELCOME_CHANNEL_ID;

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
        content: `Hello! New villiger!👋🏻\nWelcome to mozips village!🏡\nMozips Village is a place where you can learn and practice Korean together.\nShall we greet our Mozips Villigers?💬\n1️⃣ Please let us know your name (nickname).\n2️⃣ How long have you been learning Korean?\n3️⃣ Which country are you from?\n4️⃣ Say a word to our villigers`,
      });
    }
  },
};
