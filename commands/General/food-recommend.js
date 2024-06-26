const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('메뉴추천')
    .setDescription('점심 메뉴 추천.')
    .addSubcommand(subCommand =>
      subCommand.setName('추가').setDescription('목록에 식당을 추가합니다'),
    )
    .addSubcommand(subCommand =>
      subCommand
        .setName('실행')
        .setDescription('점심메뉴 랜덤추첨을 실행합니다')
        .addIntegerOption(option =>
          option
            .setName('거리제한')
            .setDescription('입력한 거리 이상의 식당은 안갈래요')
            .setMinValue(1),
        ),
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  /**
   *
   * @param {import("discord.js").CommandInteraction} interaction
   */
  async execute(interaction) {},
};
