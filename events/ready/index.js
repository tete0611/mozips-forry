const { formatToUtc, calcGMTToUTC, formatToGmt } = require('../../common/function.js');
const schedule = require('node-schedule');
const Schema = require('../../models/reservationMessage');

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
      `${client.user.tag} 로그인 , ${formatToUtc(today)} / ${formatToGmt(today)}(한국시)`,
    );

    const jobs = await Schema.find();
    if (jobs.length !== 0) {
      jobs.map(v => {
        if (v.isRepeat) {
          const { repeatAt } = v;
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
          schedule.scheduleJob(calcGMTToUTC(date), async () => {
            const channel = await client.channels.cache.get(v.channelId);
            channel.send(v.message);
          });
        }
      });

      console.log(jobs.length + '개의 예약메시지가 등록되었습니다.');
    }
  },
};
