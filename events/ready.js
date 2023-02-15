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
  },
};
