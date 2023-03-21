const { Events } = require('discord.js');
const { getRandomElement } = require('../../common/function');

const syllable = [
  'ㄱㅇ',
  'ㄱㅂ',
  'ㄱㅈ',
  'ㄱㄹ',
  'ㄴㅁ',
  'ㄴㅇ',
  'ㄴㅈ',
  'ㄷㄹ',
  'ㅇㅍ',
  'ㅅㅇ',
  'ㅅㄹ',
  'ㅁㅇ',
  'ㅎㅁ',
  'ㅅㅎ',
  'ㅁㄱ',
  'ㅁㅅ',
  'ㅋㅍ',
  'ㄹㅁ',
  'ㅎㄱ',
  'ㅎㅂ',
  'ㅂㅇ',
  'ㅇㅈ',
  'ㄹㅇ',
  'ㅇㅂ',
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
    await interaction.reply({ content: getRandomElement(syllable) });
  },
};
