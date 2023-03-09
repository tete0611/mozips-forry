const { Events, EmbedBuilder, Colors } = require('discord.js');
const { convertUTC, formatToUtc } = require('../../common/function');
const schedule = require('node-schedule');
const Schema = require('../../models/reservationMessage');

module.exports = {
  name: Events.InteractionCreate,
  once: false,
  /**
   *
   * @param {import('discord.js').CommandInteraction} interaction
   */
  async execute(interaction) {
    if (interaction.commandName !== '예약메시지') return;

    const today = new Date();
    const { options, user, member } = interaction;
    const message = options.getString('메시지');
    const year = options.getInteger('년도');
    const month = options.getInteger('월');
    const date = options.getInteger('일');
    const hour = options.getInteger('시간');
    const minute = options.getInteger('분');
    const channel = options.getChannel('채널');
    const day = options?.data[0]?.options[2]?.value;
    const totalDate = new Date(year, month - 1, date, hour, minute);
    const embed = new EmbedBuilder({
      title: message,
    });

    if (options.getSubcommand() === '반복안함') {
      if (today > totalDate)
        return interaction.reply({ content: '현재보다 이후 시간을 입력해주세요.' });
      /** Job등록 */
      const newJob = new Schema({
        isRepeat: false,
        message: message,
        reservedAt: totalDate.toISOString(),
        userId: user.id,
        userNickname: member.nickname,
      });
      // schedule.scheduleJob(convertUTC(totalDate), () => channel.send({ embeds: [embed] }));
      newJob.save();
      interaction.reply({
        content: `${year}년${month}월${date}일 ${hour}:${
          minute < 10 ? '0' + minute : minute
        }에 메시지가 등록되었습니다.`,
      });
    } else if (options.getSubcommand() === '반복') {
      schedule.scheduleJob(`0 ${minute} ${convertUTC(hour)} * * ${day !== 7 ? day : '*'}`, () => {
        channel.send({ embeds: [embed] });
        this.jobList.filter(v => v.type === '반복' || (v.type === '한번만' && v.time > new Date()));
      });
    } else if (options.getSubcommand() === '조회') {
      const jobs = await Schema.find();
      if (jobs.length === 0)
        return interaction.reply({ content: '등록된 일정이 없어요! :person_shrugging:' });
      const jobEmbeds = jobs.map(v => {
        return new EmbedBuilder({
          title: v.message,
          description: `시간 : **${formatToUtc(v.reservedAt)}** / 작성자 : **${v.userNickname}**`,
          color: Colors.Yellow,
          footer: { text: `ID : ${v._id.toString()}` },
        });
      });
      interaction.reply({ embeds: jobEmbeds });
    } else if (options.getSubcommand() === '삭제') {
      const id = options?.data[0]?.options[0]?.value;

      if (!id)
        return interaction.reply({
          content: '오류발생... 관리자에게 문의해주세요',
          ephemeral: true,
        });

      await Schema.deleteOne({ _id: id })
        .then(v => {
          if (v.deletedCount) interaction.reply({ content: '삭제완료' });
          else interaction.reply({ content: '해당하는 ID의 일정이 없어요 :man_facepalming:' });
        })
        .catch(error => {
          console.log('예약메시지 삭제에러 : ' + error);
          interaction.reply({ content: 'Error : ' + error.message, ephemeral: true });
        });
    }
  },
};
