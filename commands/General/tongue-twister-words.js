const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('절대음감')
    .setDescription('모집스봇이 발음하기 어려운 한국어 단어를 랜덤으로 보내줍니다.'),
  /**
   *
   * @param {import('discord.js').CommandInteraction} interaction
   */
  async execute(interaction) {},
};
