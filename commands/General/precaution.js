const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('주의사항').setDescription('랜덤매칭 주의사항글 입니다.'),
  /**
   *
   * @param {import('discord.js').CommandInteraction} interaction
   */
  async execute(interaction) {},
};
