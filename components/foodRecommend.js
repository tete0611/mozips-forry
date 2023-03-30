const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

const modal = new ModalBuilder().setCustomId('foodRecommend').setTitle('식당추가');

const name = new TextInputBuilder()
  .setCustomId('foodRecommendName')
  .setLabel('가게명')
  .setPlaceholder('가게명을 입력하세요.')
  .setRequired(true)
  .setStyle(TextInputStyle.Short)
  .setMaxLength(50);

const menu = new TextInputBuilder()
  .setCustomId('foodRecommendMenu')
  .setLabel('메뉴')
  .setPlaceholder('띄어쓰기로 구분해 입력해주세요.')
  .setMaxLength(100)
  .setRequired(false)
  .setStyle(TextInputStyle.Paragraph);

const distance = new TextInputBuilder()
  .setCustomId('foodRecommendDistance')
  .setLabel('거리')
  .setPlaceholder('미터(m) 단위로 입력해주세요.')
  .setStyle(TextInputStyle.Short)
  .setRequired(false);

const holiday = new TextInputBuilder()
  .setCustomId('foodRecommendHoliday')
  .setLabel('휴일')
  .setPlaceholder('ex)월 화')
  .setStyle(TextInputStyle.Short)
  .setRequired(false);

// const hashTag = new StringSelectMenuBuilder()
//   .setCustomId('foodRecommendHashTag')
//   .setPlaceholder('종류를 선택하세요.')
// .addOptions(
//   Object.entries(foodType).map(([Key, value]) => {
//     return { label: value, value: Key };
//   }),
// );

const link = new TextInputBuilder()
  .setCustomId('foodRecommendLink')
  .setPlaceholder('링크를 입력해주세요.')
  .setLabel('Url')
  .setRequired(false)
  .setStyle(TextInputStyle.Short);

const description = new TextInputBuilder()
  .setCustomId('foodRecommendDescription')
  .setPlaceholder('기타설명을 입력해주세요.')
  .setLabel('메모')
  .setRequired(false)
  .setStyle(TextInputStyle.Paragraph)
  .setMaxLength(200);

const row_1 = new ActionRowBuilder().addComponents(name);
// const row_2 = new ActionRowBuilder().addComponents(hashTag);
const row_3 = new ActionRowBuilder().addComponents(menu);
const row_4 = new ActionRowBuilder().addComponents(distance);
const row_5 = new ActionRowBuilder().addComponents(link);
const row_6 = new ActionRowBuilder().addComponents(description);

modal.addComponents(row_1, row_3, row_4, row_5, row_6);

module.exports = {
  foodModal: modal,
};
