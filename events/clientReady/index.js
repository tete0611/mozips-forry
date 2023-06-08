const { formatToUtc, formatToGmt } = require('../../common/function.js');
const schedule = require('node-schedule');
const ReservationMessage = require('../../models/reservationMessage.js');
const Attendance = require('../../models/attendanceCheck.js');
const { Events } = require('discord.js');

module.exports = {
  name: Events.ClientReady,
  once: true,
  /**
   *
   * @param {import("discord.js").Client} client
   */
  async execute(client) {
    /** 로그인 메시지 출력 */
    const today = new Date();
    console.log(
      `${client.user.username} 로그인 , ${formatToUtc(today)} / ${formatToGmt(today)}(한국시)`,
    );

    /** 이전 예약메시지 삭제 */
    ReservationMessage.deleteMany({ reservedAt: { $lt: today.toISOString() } })
      .then(
        v => v.deletedCount && console.log(`${v.deletedCount}개의 이전 예약메시지를 삭제했습니다`),
      )
      .catch(console.error);

    /** 예약메시지 등록 */
    const jobs = await ReservationMessage.find();
    if (jobs.length !== 0) {
      jobs.map(v => {
        const { repeatAt, channelId, message, reservedAt } = v;
        if (v.isRepeat) {
          schedule.scheduleJob(
            {
              tz: 'Asia/Seoul',
              rule: `0 ${repeatAt.minute} ${repeatAt.hour} * * ${
                repeatAt.day !== 7 ? repeatAt.day : '*'
              }`,
            },
            async () => {
              const channel = await client.channels.cache.get(channelId);
              channel.send(message);
            },
          );
        } else {
          const date = new Date(reservedAt);
          const rule = new schedule.RecurrenceRule();
          rule.tz = 'Asia/Seoul';
          rule.year = date.getFullYear();
          rule.month = date.getMonth();
          rule.date = date.getDate();
          rule.hour = date.getHours();
          rule.minute = date.getMinutes();
          schedule.scheduleJob(rule, async () => {
            const channel = client.channels.cache.get(channelId);
            await channel.send(message);
          });
        }
      });

      console.log(jobs.length + '개의 예약메시지가 등록되었습니다.');
    }
  },
};
