const { Events, EmbedBuilder, Colors } = require('discord.js');
const Schema = require('../../models/attendanceCheck');
const { formatToUtc } = require('../../common/function');

module.exports = {
  name: Events.MessageCreate,
  once: false,
  /**
   *
   * @param {import('discord.js').Message} message
   */
  async execute(message) {
    if (message.content !== '!출석') return;
    let newData;
    const { author } = message;
    const user = await Schema.findOne({
      userId: author.id,
    });
    const date = new Date().toISOString();
    /** 첫 출석인 경우 */
    if (!user) {
      newData = new Schema({
        count: 1,
        userId: author.id,
        date: date,
      });
      message.reply('첫번째 출석체크를 완료했어요 :tada:');
      newData.save();
      /** 이미 출석한 경우 */
    } else if (formatToUtc(user.date, 'yyyyMMdd') === formatToUtc(date, 'yyyyMMdd')) {
      message.reply({ content: '이미 오늘 출석체크를 했어요!', ephemeral: true });
      /** 누적 출석인 경우 */
    } else {
      await Schema.findOneAndUpdate(
        {
          userId: author.id,
        },
        { $set: { count: user.count + 1, date: date } },
      )
        .then(() => {
          message.reply({
            content: `:tada: __${user.count + 1}__번째 출석체크를 완료했어요 :tada:`,
          });
          // Schema.find()
          //   .sort([['count', 'descending']])
          //   .limit(6)
          //   .then(async res => {
          //     const rank = await Schema.count({ count: { $gt: user.count + 1 } }).then();
          //     const guild = await client.guilds.fetch(process.env.GUILD_ID);
          //     const members = await guild.members.fetch();
          //     const memberLength = await members.size;
          //     const embed = new EmbedBuilder({
          //       title: `:tada: **__${user.count + 1}__번째 출석체크를 완료했어요** :tada:`,
          //       fields: [
          //         { name: `나의 순위`, value: `${memberLength}명 중 ${rank + 1}등` },
          //         { name: '\u200B', value: '\u200B' },
          //       ],
          //       color: Colors.Yellow,
          //     });
          //     for (let i = 0; i <= 5; i++) {
          //       let searchMember;
          //       if (res.length > i) {
          //         searchMember = await members.get(res[i].userId);
          //         embed.addFields({
          //           name: `${i + 1}등`,
          //           value: `${searchMember.nickname ?? searchMember.user.username} (${
          //             res[i].count
          //           })`,
          //           inline: true,
          //         });
          //       } else {
          //         embed.addFields({
          //           name: `${i + 1}등`,
          //           value: '-',
          //           inline: true,
          //         });
          //       }
          //     }
          //     message.reply({ embeds: [embed] });
          //   })
          //   .catch(err => {
          //     console.log('출석순위 에러 : ' + err);
          //   });
        })
        .catch(err => {
          console.log('출석업데이트 에러 : ' + err);
        });
    }
  },
};
