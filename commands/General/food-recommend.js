const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('메뉴추천')
    .setDescription('점심 메뉴 추천받으세요.')
    .addSubcommand(subCommand =>
      subCommand.setName('추가').setDescription('목록에 식당을 추가합니다'),
    ),
  /**
   *
   * @param {import("discord.js").CommandInteraction} interaction
   */
  async execute(interaction) {},
};
