const { Events, AttachmentBuilder } = require('discord.js');

module.exports = {
  name: Events.InteractionCreate,
  once: false,
  /**
   *
   * @param {import('discord.js').CommandInteraction} interaction
   */
  async execute(interaction) {
    if (interaction.commandName !== '설명') return;
    await interaction.reply({
      files: [new AttachmentBuilder('https://i.esdrop.com/d/f/jXycTwE2IA/6PeaglBFNu.png')],
    });
  },
};
