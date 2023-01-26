module.exports = {
  name: 'guildMemberAdd',
  once: false,
  execute(client) {
    console.log(`${client.user?.tag} 가 들어왔습니다.`);
  },
};
