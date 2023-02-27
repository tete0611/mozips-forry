const { Events, ChannelType } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

let messageCount = 0;

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
    if (message.channelId === process.env.WELCOME_CHANNEL_ID) {
      if (!message.author.bot && !message.member.roles.cache.some(v => v.name === 'Manager')) {
        messageCount += 1;
        if (messageCount === 20) {
          message.channel.send({
            content: `모두 환영합니다! <#1051667735773458542> 채널에서 채팅을 시작해보세요.\nWelcome to Mozips village!\nThis channel is to introduce yourself.\nPlease use <#1051667735773458542> channel to chat :cherries:\nAnd don't forget to get your roles from <#1051689953295351818>`,
          });
        }
        if (message.content.includes('안녕')) {
          message.reply({ content: `**반갑습니다!** :slight_smile:` });
        } else if (/\b[H,h]ello\b/.test(message.content) || /\b[H,h]i\b/.test(message.content)) {
          message.reply({ content: `**Hello!** :slight_smile:` });
        }
      }
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
