const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('추방')
    .setDescription('추방할 멤버를 선택하세요.')
    .addUserOption(option =>
      option.setName('대상').setDescription('추방할 대상입니다.').setRequired(true),
    )
    .addStringOption(option => option.setName('이유').setDescription('추방 이유를 작성하세요.'))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .setDMPermission(false),
  /**
   *
   * @param {import("discord.js").CommandInteraction} interaction
   */
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;
    console.log(interaction.options.data.map(v => v));
    const target = interaction.options.getUser('대상');
    const reason = interaction.options.getString('이유') ?? '-';

    await interaction.reply(`${target.username}님이 추방되었습니다. 이유 : ${reason}`);
  },
};
