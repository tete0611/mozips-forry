const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const content = [
  '1번 문장 예시입니다.',
  '2번 문장 예시입니다.',
  '3번 문장 예시입니다.',
  '4번 문장 예시입니다.',
  '5번 문장 예시입니다.',
  '6번 문장 예시입니다.',
  '7번 문장 예시입니다.',
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('문장연습')
    .setDescription('주어진 문장을 한글로 말하세요!'),
  /**
   *
   * @param {import("discord.js").CommandInteraction} interaction
   */
  async execute(interaction) {
    const randInt = Math.floor(Math.random() * 7);
    await interaction.reply({
      embeds: [
        new EmbedBuilder().setTitle(content[randInt]).setDescription(`${randInt + 1}번 문장 힌트`),
      ],
    });
  },
};
