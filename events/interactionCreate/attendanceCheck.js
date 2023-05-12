const { Events, Colors, EmbedBuilder } = require('discord.js');
const { getRandomElement, getDifferenceDays } = require('../../common/function');
const Schema = require('../../models/attendanceCheck');
const moment = require('moment');

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
      await interaction.deferReply();
      /** 한국시 (+9시) 기준 날짜 생성 */
      const today = moment().add(9, 'hours').format('YYYYMMDD');
      const differenceDays = getDifferenceDays(userData?.date, today);
      /** 첫 출석인 경우 */
      if (!userData) {
        const newData = new Schema({
          count: 1,
          userId: user.id,
          date: today,
          successionCount: 0,
        });
        interaction.editReply({ content: `첫번째 출석체크를 완료했어요 :tada:` });
        newData.save();
        /** 이미 출석한 경우 */
      } else if (differenceDays === 0) {
        interaction.editReply({ content: '이미 오늘 출석체크를 했어요!', ephemeral: true });
        /** 누적 출석인 경우 */
      } else {
        /** 마지막 출석 날짜와 오늘 날짜의 차이 계산 */
        const successionCount = differenceDays === 1 ? userData.successionCount + 1 : 0;
        const conditionalText = successionCount
          ? `__${userData.successionCount + 2}일__ 연속 출석했어요!`
          : `__${differenceDays}일__ 만에 돌아왔네요!`;
        await Schema.findOneAndUpdate(
          {
            userId: user.id,
          },
          {
            $set: {
              count: userData.count + 1,
              date: today,
              successionCount: successionCount,
            },
          },
        )
          .then(res => {
            const embed = new EmbedBuilder({
              title: `:tada: 출석체크를 완료했어요 :tada:`,
              description: `${conditionalText}\n총 출석일수는 __${res.count + 1}일__이에요`,
              color: getRandomElement(colors),
            });
            interaction.editReply({
              embeds: [embed],
            });
          })
          .catch(err => {
            console.log('출석업데이트 에러 : ' + err);
          });
      }
      /** 출석체크 확인 */
    } else if (options.getSubcommand() === '확인') {
      await interaction.deferReply();
      /** 데이터 조회 */
      if (!userData)
        return interaction.editReply(`내 데이터가 없습니다. 출석체크를 먼저 해주세요.`);
      const dataSource = await Schema.aggregate([{ $sort: { count: -1 } }]);
      if (dataSource.length === 0) return interaction.editReply('출석 데이터가 없습니다.');
      /** 내림차순 정렬 연속 출석 데이터 생성 */
      const successionDataSource = [...dataSource]
        .sort((a, b) => b.successionCount - a.successionCount)
        .filter(v => v.successionCount !== 0);
      const { guild } = interaction;
      const myRank =
        (await Schema.distinct('count', { count: { $gt: userData.count } })).length + 1;
      const mySuccessionRank =
        (
          await Schema.distinct('successionCount', {
            successionCount: { $gt: userData.successionCount },
          })
        ).length + 1;
      const members = await guild.members.fetch();

      const totalEmbed = new EmbedBuilder({
        fields: [
          { name: '\u200B', value: '\u200B' },
          { name: `1등:first_place:`, value: '-', inline: true },
          { name: `2등:second_place:`, value: '-', inline: true },
          { name: `3등:third_place:`, value: '-', inline: true },
          { name: `4등`, value: '-', inline: true },
          { name: `5등`, value: '-', inline: true },
          { name: `6등`, value: '-', inline: true },
        ],
      });
      const successionEmbed = new EmbedBuilder({
        fields: [
          { name: '\u200B', value: '\u200B' },
          { name: `1등:first_place:`, value: '-', inline: true },
          { name: `2등:second_place:`, value: '-', inline: true },
          { name: `3등:third_place:`, value: '-', inline: true },
          { name: `4등`, value: '-', inline: true },
          { name: `5등`, value: '-', inline: true },
          { name: `6등`, value: '-', inline: true },
        ],
      });
      /** 총 출석 반복문 */
      let rank = 1;
      let prevCount = null;
      let strValue = '';
      dataSource.forEach(v => {
        const fetchMember = members.get(v.userId);
        if (fetchMember) {
          if (prevCount === null || prevCount !== v.count) {
            // 이전 값과 다른 값일 때만 순위를 증가시킴
            strValue = `${fetchMember?.displayName}(${v.count})`;
            rank++;
          } else {
            strValue += `\n${fetchMember?.displayName}(${v.count})`;
          }

          if (rank > 7) return false; // 순회 중단

          totalEmbed.data.fields[rank - 1].value = strValue;
          prevCount = v.count; // 이전 값 갱신
        }
      });
      /** 연속 출석 반복문 */
      let rank_succ = 1;
      let prevCount_succ = null;
      let strValue_succ = '';
      successionDataSource.forEach(v => {
        const fetchMember = members.get(v.userId);
        if (fetchMember) {
          if (prevCount_succ === null || prevCount_succ !== v.successionCount) {
            // 이전 값과 다른 값일 때만 순위를 증가시킴
            strValue_succ = `${fetchMember?.displayName}(${v.successionCount})`;
            rank_succ++;
          } else {
            strValue_succ += `\n${fetchMember?.displayName}(${v.successionCount})`;
          }

          if (rank_succ > 7) return false; // 순회 중단

          successionEmbed.data.fields[rank_succ - 1].value = strValue_succ;
          prevCount_succ = v.successionCount; // 이전 값 갱신
        }
      });

      interaction.editReply({
        embeds: [
          totalEmbed
            .setTitle(`:calendar_spiral: 총 출석 순위`)
            .setDescription(`**${userData.count}회** : ${members.size}명중 ${myRank}등`)
            .setColor(getRandomElement(colors)),
          successionEmbed
            .setTitle(`:date: 연속 출석 순위`)
            .setDescription(
              `**${userData.successionCount}회** : ${members.size}명중 ${mySuccessionRank}등`,
            )
            .setColor(getRandomElement(colors)),
        ],
      });
    }
  },
};
