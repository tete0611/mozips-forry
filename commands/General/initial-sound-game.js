const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('초성게임')
    .setDescription('모집스봇이 랜덤으로 초성을 제시합니다.'),
  /**
   *
   * @param {import('discord.js').CommandInteraction} interaction
   */
  async execute(interaction) {},
};
