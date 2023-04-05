const { differenceInDays } = require('date-fns');
const { Events, Colors, EmbedBuilder } = require('discord.js');
const { formatToUtc, getRandomElement } = require('../../common/function');
const Schema = require('../../models/attendanceCheck');

const colors = Object.values(Colors);

module.exports = {
  name: Events.InteractionCreate,
  once: false,
  /**
   *
   * @param {import('discord.js').CommandInteraction} interaction
   */
  async execute(interaction) {
    if (interaction.commandName !== '출석') return;
    if (!interaction.channel.name.includes('출석'))
      return interaction.reply({ content: `"출석"채널에서 사용하세요.` });
    const { options, user } = interaction;
    if (options.getSubcommand() === '체크') {
      const userData = await Schema.findOne({
        userId: user.id,
      });
      const now = new Date().toISOString();
      /** 첫 출석인 경우 */
      if (!userData) {
        const newData = new Schema({
          count: 1,
          userId: user.id,
          date: now,
          successionCount: 0,
        });
        interaction.reply({ content: `첫번째 출석체크를 완료했어요 :tada:` });
        newData.save();
        /** 이미 출석한 경우 */
      } else if (formatToUtc(userData.date, 'yyyyMMdd') === formatToUtc(now, 'yyyyMMdd')) {
        interaction.reply({ content: '이미 오늘 출석체크를 했어요!', ephemeral: true });
        /** 누적 출석인 경우 */
      } else {
        const dateOfDifference = differenceInDays(new Date(userData.date), new Date(now));
        const successionCount = dateOfDifference === 1 ? userData.successionCount + 1 : 0;
        const conditionalText = successionCount
          ? `__${userData.successionCount + 1}일__ 연속`
          : `__${dateOfDifference}일__ 만에`;
        await Schema.findOneAndUpdate(
          {
            userId: user.id,
          },
          { $set: { count: userData.count + 1, date: now, successionCount: successionCount } },
        )
          .then(res => {
            const embed = new EmbedBuilder({
              title: `:tada: ${conditionalText} 출석체크를 완료했어요 :tada:`,
              description: `총 출석일수는 __${res.count + 1}일__이에요`,
              color: getRandomElement(colors),
            });
            interaction.reply({
              embeds: [embed],
            });
          })
          .catch(err => {
            console.log('출석업데이트 에러 : ' + err);
          });
      }
    } else if (options.getSubcommand() === '순위') {
      console.log('순위실행');
    }
  },
};
