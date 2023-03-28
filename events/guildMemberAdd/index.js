const introductionChannel = '1070596400053760040';
const rolesChannel = '1051689953295351818';

module.exports = {
  name: 'guildMemberAdd',
  once: false,
  /**
   *
   * @param {import("discord.js").GuildMember} member
   */
  async execute(member) {
    console.log(`${member.user?.tag} 가 들어왔습니다.`);
    /** Welcome 채널 환영글 전송 */
    const welcomeChannel = member.guild.channels.cache.get(process.env.WELCOME_CHANNEL_ID);
    welcomeChannel.send({
      content: `**Welcome <@${member.user.id}>!**\nPlease introduce yourself:sunflower::partying_face:\n(name, nationality, how long have you studied Korean)`,
    });
    /** DM 전송 */
    const { user } = member;
    user
      .createDM()
      .then(dm => {
        dm.send({
          content: `Welcome, ${user.username} :smiling_face_with_3_hearts: This is MOZIPS village\n:sunflower:**Please read <#${introductionChannel}> channel thoroughly**\nPlus, don't forget to get roles from <#${rolesChannel}> channel.\nThrough roles, we can understand each other better.\nSo please check out!\nNow, start chatting and practice Korean with MOZIPS family:orange_heart:`,
        });
      })
      .catch(console.error);
  },
};
