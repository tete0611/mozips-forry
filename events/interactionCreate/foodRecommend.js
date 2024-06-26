const { Events, EmbedBuilder, Colors } = require('discord.js');
const Schema = require('../../models/foodRecommend');
const { foodModal } = require('../../components/foodRecommend');
const { REG_EXP } = require('../../common/regex');
const { getRandomElement } = require('../../common/function');
const { foods } = require('../../common/data.js');

const colors = Object.values(Colors);
/**
 *
 * @param {number | null} limit
 */
const getWhere = limit => {
  const where = [{ $sample: { size: 1 } }];
  if (limit) where.unshift({ $match: { distance: { $lte: limit } } });
  return where;
};

module.exports = {
  name: Events.InteractionCreate,
  once: false,
  /**
   *
   * @param {import('discord.js').CommandInteraction} interaction
   */
  async execute(interaction) {
    /** 명령어 실행 */
    if (interaction.commandName === '메뉴추천' && interaction.isChatInputCommand()) {
      const { options } = interaction;
      /** 메뉴추천 실행 */
      if (options.getSubcommand() === '실행') {
        const limitDistance = options.getInteger('거리제한');
        const where = getWhere(limitDistance);
        const data = await Schema.aggregate(where);
        const item = data.at();
        if (!item) return interaction.reply({ content: `데이터가 없어요 :woman_facepalming:` });
        const embed = new EmbedBuilder()
          .setTitle(item.name)
          .setDescription(`메뉴 : ${item.menu.length !== 0 ? item.menu.join(', ') : '-'}`)
          .setColor(getRandomElement(colors))
          .addFields([
            { name: '\u200B', value: '\u200B' },
            {
              name: '거리',
              value: item.distance ? `${item.distance.toString()}m` : '배달',
              inline: true,
            },
            { name: '설명', value: item.description || '-', inline: true },
          ])
          .setURL(item.link || null);

        await interaction.reply({ embeds: [embed] });

        /** 메뉴추천 추가 */
      } else if (options.getSubcommand() === '추가') {
        // Promise.all(
        //   foods?.map(v => {
        //     const newData = new Schema({
        //       name: v.name,
        //       menu: v?.menu,
        //       description: v?.description,
        //       distance: v?.distance,
        //       link: v?.link,
        //     });
        //     newData.save().catch(console.error);
        //   }),
        // );
        // return;
        await interaction.showModal(foodModal);
      }
      /** 모달 제출 */
    } else if (interaction.isModalSubmit()) {
      const { fields } = interaction;
      const name = fields.getTextInputValue('foodRecommendName');
      const menu = fields.getTextInputValue('foodRecommendMenu');
      const distance = fields.getTextInputValue('foodRecommendDistance');
      const link = fields.getTextInputValue('foodRecommendLink');
      const description = fields.getTextInputValue('foodRecommendDescription');

      if (distance && isNaN(Number(distance)))
        return interaction.reply({
          content: '"거리"값에 숫자만 입력해주세요.',
          ephemeral: true,
        });
      if (link && !REG_EXP.hyperLink.test(link))
        return interaction.reply({
          content: 'http: 또는 https: 로 시작하는 링크를 입력해주세요.',
          ephemeral: true,
        });
      const newData = new Schema({
        name: name,
        menu: menu.split(' '),
        description: description,
        distance: Number(distance),
        link: link,
      });
      newData
        .save()
        .then(
          async () =>
            await interaction.reply({
              content: `__${name}__이(가) 추가 되었습니다`,
              ephemeral: true,
            }),
        )
        .catch(async err => interaction.reply({ content: err.message }));
    }
  },
};
