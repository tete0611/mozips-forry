const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('예약메시지')
    .setDescription('예약 메시지를 등록할 수 있습니다.'),
  /**
   *
   * @param {import("discord.js").CommandInteraction} interaction
   */
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;
    console.log(interaction.options.data.map(v => v));
    await interaction.reply({ content: `**Perfect !!**` });
  },
};
