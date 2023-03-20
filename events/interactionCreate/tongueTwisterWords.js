const { Events } = require('discord.js');
const { random } = require('../../common/function');

const words = [
  '초코칩머핀',
  '찜샤브샤브',
  '햇꽁보리밥',
  '지리산산삼',
  '철수철책상',
  '돌솥설렁탕',
  '한양양장점',
  '풋껍질콩찜',
  '박법학박사',
  '꿀호박범벅',
  '게살샥스핀',
  '고려고교복',
  '경찰청창살',
  '당진동동주',
  '담당선생님',
  '청송콩찰떡',
  '삼선볶음밥',
  '로얄뉴로얄',
  '무화과와플',
  '확률분포표',
];

module.exports = {
  name: Events.InteractionCreate,
  once: false,
  /**
   *
   * @param {import('discord.js').CommandInteraction} interaction
   */
  async execute(interaction) {
    if (interaction.commandName !== '절대음감') return;
    await interaction.reply({ content: random(words) });
  },
};
