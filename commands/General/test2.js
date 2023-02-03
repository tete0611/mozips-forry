const { SlashCommandBuilder, ActionRowBuilder, ChannelSelectMenuBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('액션빌더').setDescription('액션빌더 만들기입니다.'),
  /**
   *
   * @param {import("discord.js").CommandInteraction} interaction
   */
  async execute(interaction) {
    const row = new ActionRowBuilder().addComponents(
      new ChannelSelectMenuBuilder().setCustomId('select').setPlaceholder('Nothing selected'),
    );
    // const row2 = new ActionRowBuilder().addComponents(
    //   new ChannelSelectMenuBuilder().setCustomId('select2').setPlaceholder('Nothing selected'),
    // );
    await interaction.reply({ content: 'Pong!', components: [row] });
  },
};
