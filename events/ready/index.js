const { formatToUtc, convertUTC } = require('../../common/function.js');
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
    console.log(`${client.user.tag} 로그인 , ${formatToUtc(new Date())}`);

    const jobs = await Schema.find();
    if (jobs.length !== 0) {
      jobs.map(v => {
        if (v.isRepeat) {
          const { repeatAt } = v;
          schedule.scheduleJob(
            `0 ${repeatAt.minute} ${convertUTC(repeatAt.hour)} * * ${
              repeatAt.day !== 7 ? repeatAt.day : '*'
            }`,
            async () => {
              const channel = await client.channels.cache.get(v.channelId);
              channel.send(v.message);
            },
          );
        } else {
          const date = new Date(v.reservedAt);
          schedule.scheduleJob(convertUTC(date), async () => {
            const channel = await client.channels.cache.get(v.channelId);
            channel.send(v.message);
          });
        }
      });

      console.log(jobs.length + '개의 예약메시지가 등록되었습니다.');
    }
  },
};
