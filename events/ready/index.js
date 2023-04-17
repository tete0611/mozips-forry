const { formatToUtc, calcGMTToUTC, formatToGmt } = require('../../common/function.js');
const schedule = require('node-schedule');
const Schema = require('../../models/reservationMessage');
const { sub } = require('date-fns');

module.exports = {
  name: 'ready',
  once: true,
  /**
   *
   * @param {import("discord.js").Client} client
   */
  async execute(client) {
    const today = new Date();
    console.log(
      `${client.user.username} 로그인 , ${formatToUtc(today)} / ${formatToGmt(today)}(한국시)`,
    );
    // console.log(today.toISOString());
    // console.log(sub(today, { days: 1 }).toISOString());
    // console.log(sub(today, { days: 2 }).toISOString());
    // console.log(sub(today, { days: 3 }).toISOString());
    // console.log(sub(today, { days: 4 }).toISOString());

    const jobs = await Schema.find();
    if (jobs.length !== 0) {
      jobs.map(v => {
        if (v.isRepeat) {
          const { repeatAt } = v;
          const rule = new schedule.RecurrenceRule();
          schedule.scheduleJob(
            `0 ${repeatAt.minute} ${calcGMTToUTC(repeatAt.hour)} * * ${
              repeatAt.day !== 7 ? repeatAt.day : '*'
            }`,
            async () => {
              const channel = await client.channels.cache.get(v.channelId);
              channel.send(v.message);
            },
          );
        } else {
          const date = new Date(v.reservedAt);
          const rule = new schedule.RecurrenceRule();
          rule.tz = 'Asia/Seoul';
          rule.year = date.getFullYear();
          rule.month = date.getMonth() + 1;
          rule.date = date.getDate();
          rule.hour = date.getHours();
          rule.minute = date.getMinutes();
          schedule.scheduleJob(rule, async () => {
            const channel = await client.channels.cache.get(v.channelId);
            channel.send(v.message);
          });
        }
      });

      console.log(jobs.length + '개의 예약메시지가 등록되었습니다.');
    }
  },
};
