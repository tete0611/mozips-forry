module.exports = {
  name: 'guildMemberAdd',
  once: false,
  /**
   *
   * @param {import("discord.js").GuildMember} member
   */
  async execute(member) {
    const welcomeChannel = member.guild.channels.cache.get(process.env.WELCOME_CHANNEL_ID);
    welcomeChannel.send({
      content: `**Welcome <@${member.user.id}>!**\nPlease introduce yourself:sunflower::partying_face:\n(name, nationality, how long have you studied Korean)`,
    });
    console.log(`${member.user?.tag} 가 들어왔습니다.`);
  },
};
