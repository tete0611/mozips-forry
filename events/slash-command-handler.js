const { ChannelType } = require('discord.js');
const client = require('../index');

module.exports = {
  name: 'interactionCreate',
  once: false,
  /**
   *
   * @param {import("discord.js").CommandInteraction} interaction
   */
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.channel.type == ChannelType.DM) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return console.log('커맨드가 없습니다');
    try {
      await command.execute(interaction);
    } catch (err) {
      console.log(err);
    }
  },
};
