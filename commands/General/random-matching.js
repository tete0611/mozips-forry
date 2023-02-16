const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('랜덤매칭')
    .setDescription('1:1 사용자 랜덤매칭 명령어를 사용해보세요!')
    .addSubcommand(subCommand =>
      subCommand.setName('전체').setDescription('대기방에 있는 사용자 모두 동시에 매칭해요.'),
    )
    .addSubcommand(subCommand =>
      subCommand.setName('개인').setDescription('대기방에 있는 사용자 중 1명과 매칭해요.'),
    ),
  /**
   *
   * @param {import("discord.js").CommandInteraction} interaction
   */
  async execute(interaction) {},
};
