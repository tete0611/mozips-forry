const { Events, AttachmentBuilder } = require('discord.js');

module.exports = {
  name: Events.InteractionCreate,
  once: false,
  /**
   *
   * @param {import('discord.js').CommandInteraction} interaction
   */
  async execute(interaction) {
    if (interaction.commandName !== '주의사항') return;
    await interaction.reply({
      files: [new AttachmentBuilder('https://i.esdrop.com/d/f/jXycTwE2IA/GIWzBa8TiJ.png')],
    });
  },
};
