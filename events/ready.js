const { formatToUtc } = require('../common/function.js');

module.exports = {
  name: 'ready',
  once: true,
  /**
   *
   * @param {import("discord.js").Client} client
   */
  async execute(client) {
    console.log(`${client.user.tag} 로그인 , ${formatToUtc(new Date())}`);
    // /** 대기방 */
    // const guild = client.guilds.cache.get('1059355706509238294');
    // /** 랜덤매칭방 */
    // const randomRoom = client.channels.cache.get('1059355707092242475');
    // guild.members
    //   .fetch()
    //   .then(members => {
    //     members.forEach(member => {
    //       member.voice
    //         .setChannel(randomRoom)
    //         .then(() => {
    //           console.log(`${member.user.tag}가 채널에 추가되었습니다.`);
    //         })
    //         .catch(console.error);
    //     });
    //   })
    //   .catch(console.error);
  },
};
