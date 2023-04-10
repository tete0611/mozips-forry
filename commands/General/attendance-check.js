const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('출석')
    .setDescription('출석체크 관련 명령어 입니다')
    .addSubcommand(subCommand => subCommand.setName('체크').setDescription('출석체크를 합니다'))
    .addSubcommand(subCommand =>
      subCommand.setName('순위').setDescription('출석 순위를 확인합니다'),
    ),
  /**
   *
   * @param {import('discord.js').CommandInteraction} interaction
   */
  async execute(interaction) {},
};
