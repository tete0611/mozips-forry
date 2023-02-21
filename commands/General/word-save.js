const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('단어저장')
    .setDescription('입력한 문장을 봇이 DM으로 보내줘요.')
    .addStringOption(option =>
      option
        .setName('입력')
        .setDescription('단어/문장을 입력하세요.')
        .setRequired(true)
        .setMaxLength(200),
    ),
  /**
   *
   * @param {import("discord.js").CommandInteraction} interaction
   */
  async execute(interaction) {},
};
