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
    if (message.channelId === process.env.WELCOME_CHANNEL_ID)
      if (message.content.includes('안녕')) {
        message.reply({ content: `**반갑습니다!** :slight_smile:` });
      } else if (/\b[H,h]ello\b/.test(message.content) || /\b[H,h]i\b/.test(message.content)) {
        if (!message.author.bot) message.reply({ content: `**Hello!** :slight_smile:` });
      }
    // else if (message.content === '!봇들어와') {
    //   try {
    //     await joinVoiceChannelById(message.channel);
    //   } catch (error) {
    //     message.channel.send('오류가 발생했습니다: ' + error.message);
    //   }
    // }
  },
};
