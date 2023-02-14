const { ActionRowBuilder, ButtonBuilder } = require('@discordjs/builders');
const { ButtonStyle, Events, Message } = require('discord.js');

module.exports = {
  name: Events.MessageCreate,
  once: false,
  /**
   *
   * @param {import("discord.js").Message} message
   */
  async execute(message) {
    if (message.content.includes('안녕')) {
      message.reply({ content: `**반갑습니다!**` });
    } else if (message.content === '버튼') {
      const button_1 = new ActionRowBuilder().addComponents(
        new ButtonBuilder({
          custom_id: 'button_1',
          label: '마',
          style: ButtonStyle.Primary,
        }),
      );
      const button_2 = new ActionRowBuilder().addComponents(
        new ButtonBuilder({ custom_id: 'button_2', label: '틴', style: ButtonStyle.Danger }),
      );
      const button_3 = new ActionRowBuilder().addComponents(
        new ButtonBuilder({
          // custom_id: 'button_3',
          label: '봇',
          style: ButtonStyle.Link,
          url: 'https://www.naver.com/',
        }),
      );
      const button_4 = new ActionRowBuilder().addComponents(
        new ButtonBuilder({ custom_id: 'button_4', label: '버', style: ButtonStyle.Secondary }),
      );
      const button_5 = new ActionRowBuilder().addComponents(
        new ButtonBuilder({ custom_id: 'button_5', label: '튼', style: ButtonStyle.Success }),
      );
      await message.reply({
        content: '클릭 해주세요.',
        components: [button_1, button_2, button_3, button_4, button_5],
      });
    } else if (message.content === '!매칭') {
      const voiceChannel = message.member.voice.channel;
      const members = voiceChannel.members;
      const selectedMembers = [];
      for (let i = 0; i < 2; i++) {
        const randomIndex = Math.floor(Math.random() * members.array().length);
        selectedMembers.push(members.array()[randomIndex]);
      }
      selectedMembers.forEach(member => {
        member.voice.setChannel(voiceChannel);
      });
      message.reply(
        `${selectedMembers[0].displayName}과 ${selectedMembers[1].displayName}이 매칭되었습니다!`,
      );
    }
  },
};
