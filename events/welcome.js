module.exports = {
  name: 'guildMemberAdd',
  once: false,
  /**
   *
   * @param {import("discord.js").Mes} client
   */
  execute(client) {
    console.log(`${client.user?.tag} 가 들어왔습니다.`);
  },
};
