const { Events, EmbedBuilder, Colors } = require('discord.js');
const { getRandomElement } = require('../../common/function');

const syllable = [
  'ㄱ ㅇ',
  'ㄱ ㅂ',
  'ㄱ ㅈ',
  'ㄱ ㄹ',
  'ㄴ ㅁ',
  'ㄴ ㅇ',
  'ㄴ ㅈ',
  'ㄷ ㄹ',
  'ㅇ ㅍ',
  'ㅅ ㅇ',
  'ㅅ ㄹ',
  'ㅁ ㅇ',
  'ㅎ ㅁ',
  'ㅅ ㅎ',
  'ㅁ ㄱ',
  'ㅁ ㅅ',
  'ㅋ ㅍ',
  'ㄹ ㅁ',
  'ㅎ ㄱ',
  'ㅎ ㅂ',
  'ㅂ ㅇ',
  'ㅇ ㅈ',
  'ㄹ ㅇ',
  'ㅇ ㅂ',
];

module.exports = {
  name: Events.InteractionCreate,
  once: false,
  /**
   *
   * @param {import('discord.js').CommandInteraction} interaction
   */
  async execute(interaction) {
    if (interaction.commandName !== '초성게임') return;
    await interaction.reply({
      embeds: [
        new EmbedBuilder({ title: `**${getRandomElement(syllable)}**`, color: Colors.Yellow }),
      ],
    });
  },
};
