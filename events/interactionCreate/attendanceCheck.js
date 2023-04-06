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

    /** 내 데이터 조회 */
    const userData = await Schema.findOne({
      userId: user.id,
    });

    /** 출석체크 체크 */
    if (options.getSubcommand() === '체크') {
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
        const dateOfDifference = differenceInDays(new Date(now), new Date(userData.date));
        const successionCount = dateOfDifference === 1 ? userData.successionCount + 1 : 0;
        const conditionalText = successionCount
          ? `__${userData.successionCount + 2}일__ 연속`
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
      /** 출석체크 순위 */
    } else if (options.getSubcommand() === '순위') {
      const dataSource = await Schema.aggregate([{ $sort: { count: -1 } }]);
      if (dataSource.length === 0) return interaction.reply('출석 데이터가 없습니다.');
      const { guild } = interaction;
      const myRank = (await Schema.count({ count: { $gt: userData.count + 1 } }).then()) + 1;
      const members = await guild.members.fetch();
      const embed = new EmbedBuilder({
        title: `나의 순위 : ${myRank}등`,
        description: `총 : ${members.size}명`,
        fields: [
          { name: '\u200B', value: '\u200B' },
          { name: `1등:first_place:`, value: '-', inline: true },
          { name: `2등:second_place:`, value: '    -    ', inline: true },
          { name: `3등:third_place:`, value: '    -    ', inline: true },
          { name: `4등`, value: '    -    ', inline: true },
          { name: `5등`, value: '    -    ', inline: true },
          { name: `6등`, value: '    -    ', inline: true },
        ],
        color: getRandomElement(colors),
      });
      let rank = 1;
      let prevCount = null;
      let strValue = '';
      dataSource.forEach(v => {
        const member = members.get(v.userId);
        if (prevCount === null || prevCount !== v.count) {
          // 이전 값과 다른 값일 때만 순위를 증가시킴
          strValue = `${member.nickname ?? member.user.username} (${v.count})`;
          rank++;
        } else {
          strValue += `\n${member.nickname ?? member.user.username} (${v.count})`;
        }
        embed.data.fields[rank - 1].value = strValue;
        prevCount = v.count; // 이전 값 갱신

        if (rank > 6) {
          return false; // 순회 중단
        }
      }),
        interaction.reply({ embeds: [embed] });
    }
  },
};
