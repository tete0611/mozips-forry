const { Events, ChannelType } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

const joinVoiceChannelById = async channel => {
  if (!channel || channel.type !== ChannelType.GuildVoice)
    throw new Error('!봇들어와(에러) : 음성 채널을 찾을 수 없습니다');

  const connection = joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
  });

  return connection;
};

module.exports = {
  name: Events.MessageCreate,
  once: false,
  /**
   *
   * @param {import("discord.js").Message} message
   */
  async execute(message) {
    if (message.content.includes('안녕')) {
      message.reply({ content: `**반갑습니다!** :slight_smile:` });
    } else if (/\bHello\b/.test(message.content) || /\bHi\b/.test(message.content)) {
      if (!message.author.bot) message.reply({ content: `**Hello!** :slight_smile:` });
    } else if (message.content === '!봇들어와') {
      try {
        await joinVoiceChannelById(message.channel);
      } catch (error) {
        message.channel.send('오류가 발생했습니다: ' + error.message);
      }
    } else if (message.content === '버튼') {
      // const button_1 = new ActionRowBuilder().addComponents(
      //   new ButtonBuilder({
      //     custom_id: 'button_1',
      //     label: '마',
      //     style: ButtonStyle.Primary,
      //   }),
      // );
      // const button_2 = new ActionRowBuilder().addComponents(
      //   new ButtonBuilder({ custom_id: 'button_2', label: '틴', style: ButtonStyle.Danger }),
      // );
      // const button_3 = new ActionRowBuilder().addComponents(
      //   new ButtonBuilder({
      //     // custom_id: 'button_3',
      //     label: '봇',
      //     style: ButtonStyle.Link,
      //     url: 'https://www.naver.com/',
      //   }),
      // );
      // const button_4 = new ActionRowBuilder().addComponents(
      //   new ButtonBuilder({ custom_id: 'button_4', label: '버', style: ButtonStyle.Secondary }),
      // );
      // const button_5 = new ActionRowBuilder().addComponents(
      //   new ButtonBuilder({ custom_id: 'button_5', label: '튼', style: ButtonStyle.Success }),
      // );
      // await message.reply({
      //   content: '클릭 해주세요.',
      //   components: [button_1, button_2, button_3, button_4, button_5],
      // });
    }
  },
};
