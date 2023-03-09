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
        const date = new Date(v.reservedAt);
        schedule.scheduleJob(convertUTC(date), () => console.log('실행합니데이'));
      });

      console.log(jobs.length + '개의 예약메시지가 등록되었습니다.');
    }
  },
};
