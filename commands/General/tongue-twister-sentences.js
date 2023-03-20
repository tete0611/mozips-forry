const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('잰말놀이')
    .setDescription('모집스봇이 한국어 잰말놀이 문장을 랜덤으로 보내줍니다.'),
  /**
   *
   * @param {import('discord.js').CommandInteraction} interaction
   */
  async execute(interaction) {},
};
