const schedule = require('node-schedule');
const { format } = require('date-fns');
const { EmbedBuilder } = require('@discordjs/builders');

module.exports = {
  name: 'interactionCreate',
  once: false,
  /**
   *
   * @param {import("discord.js").Interaction} interaction
   */
  async execute(interaction) {
    // 모달제출
    if (interaction.isModalSubmit()) {
      if (interaction.customId === 'myModal') {
        const title = interaction.fields.getTextInputValue('titleId');
        const content = interaction.fields.getTextInputValue('contentId');

        interaction.reply({
          content: `모달 제출 성공 (제목:${title} / 내용:${content})`,
        });
      }
    }
    // 버튼 클릭
    else if (interaction.isButton()) console.log(interaction);
    // 예약 메시지 명령
    else if (interaction.commandName === '예약메시지') {
      const today = new Date();
      const message = interaction.options.getString('메시지');
      const year = interaction.options.getInteger('년도');
      const month = interaction.options.getInteger('월');
      const date = interaction.options.getInteger('일');
      const hour = interaction.options.getInteger('시간');
      const minute = interaction.options.getInteger('분');
      const channel = interaction.options.getChannel('채널');
      const totalDate = new Date(year, month - 1, date, hour, minute);
      if (today < totalDate)
        await schedule.scheduleJob(totalDate, () => channel.send({ content: message }));
      // console.log(format(totalDate, 'yyyy-MM-dd HH:mm'));
    }
  },
};
