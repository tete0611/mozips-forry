const { ActionRowBuilder, ButtonBuilder } = require('@discordjs/builders');
const { ButtonStyle } = require('discord.js');

module.exports = {
  name: 'messageCreate',
  once: false,
  async execute(message) {
    if (message.content.includes('안녕')) {
      message.reply({ content: `**반갑습니다!**` });
    } else if (message.content === '임베드테스트') {
      console.log(message);
      message.reply({
        content: `Welcome, ${message.author.username} This if the MOZIPS village\n\n Please take your role first from #역할`,
      });
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
    }
  },
};
