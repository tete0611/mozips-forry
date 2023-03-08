const { Events } = require('discord.js');
const Schema = require('../../models/attendanceCheck');

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
    const { author, channel } = message;
    const user = await Schema.findOne({
      userId: author.id,
    });
    const t = new Date();
    const date =
      t.getFullYear().toString() +
      (t.getMonth() + 1).toString().padStart(2, '0') +
      t.getDate().toString().padStart(2, '0');

    if (!user) {
      newData = new Schema({
        count: '1',
        userId: author.id,
        date: date,
      });
      channel.send('첫번째 출석체크를 완료했어요 :happy:');
      newData.save();
    } else if (user.date === date) {
      message.reply({ content: '이미 오늘 출석체크를 했어요!', options: { ephemeral: true } });
    } else {
      await Schema.findOneAndRemove({
        userId: author.id,
      });
      newData = new Schema({
        count: String(parseInt(user.count) + 1),
        userid: author.id,
        date: date,
      });
      message.reply(
        `**출석체크를 완료했어요** :happy:\n누적 출석체크 횟수 : __${String(
          parseInt(user.count) + 1,
        )}__`,
      );
      newData.save();
    }
  },
};
