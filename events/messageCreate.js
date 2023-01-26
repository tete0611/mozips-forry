module.exports = {
  name: 'messageCreate',
  once: false,
  execute(message) {
    if (message.content === '안녕') {
      message.reply({ content: `**반갑습니다!**` });
    } else if (message.content === '임베드테스트') {
      console.log(message);
      message.reply({
        content: `Welcome, ${message.author.username} This if the MOZIPS village\n\n Please take your role first from #역할`,
      });
    }
  },
};
