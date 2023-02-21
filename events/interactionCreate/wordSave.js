const { Events } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
  name: Events.InteractionCreate,
  once: false,
  /**
   *
   * @param {import('discord.js').CommandInteraction} interaction
   */
  async execute(interaction) {
    if (interaction.commandName !== '단어저장') return;

    const { options, user } = interaction;
    const message = options.getString('입력');

    await user.send(message);
    await interaction.reply({ content: '**전송완료** (3초 뒤 사라짐)', ephemeral: true });
    await wait(3000);
    await interaction.deleteReply();
  },
};
