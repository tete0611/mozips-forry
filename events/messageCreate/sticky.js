const { Events, Colors, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { welcomeEmbed } = require('../../components/welcome');
const { getRandomElement } = require('../../common/function');
const { env } = process;
const moment = require('moment');
const { createCanvas, loadImage } = require('canvas');
const welcomeChannelId = env.WELCOME_CHANNEL_ID;

const colors = Object.values(Colors);

module.exports = {
  name: Events.MessageCreate,
  once: false,
  /**
   *
   * @param {import("discord.js").Message} message
   */
  async execute(message) {
    const { channel, channelId, author } = message;
    if (author.bot) return;
    if (channelId === welcomeChannelId) {
      const messages = await channel.messages.fetch({ limit: 5 });
      const botMessages = messages.filter(msg => msg.author.id === process.env.ID);
      const messagesToDelete = botMessages.filter(msg => msg.id !== message.id).map(msg => msg.id);
      if (messagesToDelete.length > 0) channel.bulkDelete(messagesToDelete);
      await channel.send({
        embeds: [welcomeEmbed.setColor(getRandomElement(colors))],
      });
    }
    // else if (channel.name.includes('출석')) {
    //   const canvas = createCanvas(200, 70); // 캔버스 그리기
    //   const ctx = canvas.getContext('2d'); // ctx 선언
    //   ctx.fillStyle = '#000'; // 배경 색상
    //   ctx.fillRect(0, 0, canvas.width, canvas.height); // 배경 그리기
    //   const title = '12:20'; // 타이틀 선언
    //   ctx.font = '40px Sans'; // 폰트 설정
    //   const titlePosition = { x: canvas.width / 2, y: canvas.height / 2 + 15 }; // 폰트위치 선언
    //   ctx.fillStyle = '#fff'; // 폰트 색상
    //   ctx.textAlign = 'center'; // 폰트 정렬
    //   ctx.fillText(title, titlePosition.x, titlePosition.y); // 텍스트 그리기
    //   console.log(canvas.toBuffer());
    //   const attachment = new AttachmentBuilder(canvas.toBuffer());
    // const clockEmbed = new EmbedBuilder()
    //   .setTitle('세계시각')
    //   .setColor(getRandomElement(colors))
    //   .addFields(
    //     { name: '\u200B', value: '\u200B' },
    //     {
    //       name: ':flag_kr: 대한민국:서울',
    //       value: moment().add(9, 'hours').format('M/D hh:mm'),
    //       inline: true,
    //     },
    //     {
    //       name: ':flag_um: 미국:로스앤젤레스',
    //       value: moment().subtract(8, 'hours').format('M/D hh:mm'),
    //       inline: true,
    //     },
    //     {
    //       name: ':flag_vn: 베트남:하노이',
    //       value: moment().add(7, 'hours').format('M/D hh:mm'),
    //       inline: true,
    //     },
    //     {
    //       name: ':flag_gb: 영국:런던',
    //       value: moment().format('M/D hh:mm'),
    //       inline: true,
    //     },
    //   );

    //   await channel.send({ content: '123', files: [attachment] });
    // }
  },
};
