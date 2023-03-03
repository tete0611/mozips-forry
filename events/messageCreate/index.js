const { Events, ChannelType } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const { REG_EXP } = require('../../common/regex');
const { warningKoreanEmbed } = require('../../components/messageCreate');
const { env } = process;
let messageCount = 0;
const welcomeChannelId = env.WELCOME_CHANNEL_ID;
const koreanChannelId = env.KOREAN_CHANNEL_ID;
const koreanBeginnerChannelId = env.KOREAN_BEGINNER_CHANNEL_ID;

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
    if (message.author.bot) return;
    if (message.channelId === welcomeChannelId) {
      if (!message.member.roles.cache.some(v => v.name === 'Manager')) {
        messageCount += 1;
        if (messageCount === 20) {
          message.channel.send({
            content: `모두 환영합니다! <#1051667735773458542> 채널에서 채팅을 시작해보세요.\nWelcome to Mozips village!\nThis channel is to introduce yourself.\nPlease use <#1051667735773458542> channel to chat :cherries:\nAnd don't forget to get your roles from <#1051689953295351818>`,
          });
        }
        if (message.content.includes('안녕')) {
          message.reply({ content: `**반갑습니다!** :slight_smile:` });
        } else if (REG_EXP.hello.test(message.content) || REG_EXP.hi.test(message.content)) {
          message.reply({ content: `**Hello!** :slight_smile:` });
        }
      }
    } else if (
      message.channelId === koreanChannelId ||
      message.channelId === koreanBeginnerChannelId
    ) {
      const formatted = message.content
        .replace(REG_EXP.mension, '')
        .replace(REG_EXP.hashTag, '')
        .replace(REG_EXP.hyperLink, '')
        .replace(/\d/g, '')
        // eslint-disable-next-line no-useless-escape
        .replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g, '')
        .replace(/<:[a-zA-Z0-9_]+:[0-9]+>/g, '');
      console.log(formatted.codePointAt());
      if (!REG_EXP.korean.test(formatted) && formatted.trim() !== '' && /[a-z]/g.test(formatted)) {
        // message.reply({ embeds: [warningKoreanEmbed] });
        message.reply({ content: message.content });
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
