const { Events, EmbedBuilder, Colors } = require('discord.js');
const Schema = require('../../models/foodRecommend');
const { foodModal } = require('../../components/foodRecommend');
const { REG_EXP } = require('../../common/regex');
const { getRandomElement } = require('../../common/function');
const { Builder, By, Key, until } = require('selenium-webdriver');

const colors = Object.values(Colors);

module.exports = {
  name: Events.InteractionCreate,
  once: false,
  /**
   *
   * @param {import('discord.js').CommandInteraction} interaction
   */
  async execute(interaction) {
    /** 명령어 실행 */
    if (interaction.commandName === '메뉴추천') {
      const { options } = interaction;
      /** 메뉴추천 실행 */
      if (options.getSubcommand() === '실행') {
        let driver = await new Builder().forBrowser('chrome').build();
        try {
          await driver.get(
            'https://www.notion.so/f09d67e62b454bd5beba52ebfb7e9599?v=50c5d1ab2e764473b06e1059107664bd',
          );
        } finally {
          // driver.quit();
        }
        // const data = await Schema.aggregate([{ $sample: { size: 1 } }]);
        // const item = data.at();
        // const embed = new EmbedBuilder()
        //   .setTitle(item.name)
        //   .setDescription(`메뉴 : ${item.menu.length !== 0 ? item.menu.join(', ') : '-'}`)
        //   .setColor(getRandomElement(colors))
        //   .setImage(
        //     'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjEwMjNfMjM4%2FMDAxNjY2NTEyMDU1MDM2.-if0jBERn4_osp-GoPZVI6yr3tyNwhErCmgKJR86v9Ug.EhEpO7c2LxA5uCW3lL0ONPmV5_sNNCf_Hk5unlarFhgg.JPEG.3m15s%2FIMG_7570.jpg',
        //   )
        //   .addFields([
        //     { name: '\u200B', value: '\u200B' },
        //     {
        //       name: '거리',
        //       value: item.distance ? `${item.distance.toString()}m` : '-',
        //       inline: true,
        //     },
        //     { name: '설명', value: item.description || '-', inline: true },
        //   ])
        //   .setURL(item.link || null)
        //   .setAuthor({
        //     name: item.name,
        //     iconURL:
        //       'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjEwMjNfMjM4%2FMDAxNjY2NTEyMDU1MDM2.-if0jBERn4_osp-GoPZVI6yr3tyNwhErCmgKJR86v9Ug.EhEpO7c2LxA5uCW3lL0ONPmV5_sNNCf_Hk5unlarFhgg.JPEG.3m15s%2FIMG_7570.jpg',
        //     url: item.link || undefined,
        //   });

        // await interaction.reply({ embeds: [embed] });

        /** 메뉴추천 추가 */
      } else if (options.getSubcommand() === '추가') {
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
        return interaction.reply({ content: '"거리"값에 숫자만 입력해주세요.', ephemeral: true });
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
