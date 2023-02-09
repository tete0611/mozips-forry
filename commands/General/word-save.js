const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

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
  async execute(interaction) {
    const { options, user } = interaction;
    const message = options.getString('입력');

    await user.send(message);
    await interaction.reply({ content: '**전송완료** (3초 뒤 사라짐)' });
    await wait(3000);
    await interaction.deleteReply();
  },
};
