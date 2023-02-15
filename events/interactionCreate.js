const { myMember, prevInteraction } = require('../commands/General/random-matching');

module.exports = {
  name: 'interactionCreate',
  once: false,
  /**
   *
   * @param {import("discord.js").Interaction} interaction
   */
  async execute(interaction) {
    // 모달제출
    if (interaction.isModalSubmit()) {
      if (interaction.customId === 'myModal') {
        const title = interaction.fields.getTextInputValue('titleId');
        const content = interaction.fields.getTextInputValue('contentId');

        interaction.reply({
          content: `모달 제출 성공 (제목:${title} / 내용:${content})`,
        });
      }
    }
    // 버튼 클릭
    else if (interaction.isButton()) {
      const { client, user, message } = interaction;
      const guild = await client.guilds.fetch('1059355706509238294');
      const member = await guild.members.fetch(user);
      console.log(myMember);
      const randomRoom = client.channels.cache.get('1059355707092242475');
      if (interaction.customId === 'randomMatchingConfirmButton') {
        await member.voice.setChannel(randomRoom);
        await message.delete();
        // prevInteraction.reply('사용자가 승락했어요.');
      } else if (interaction.customId === 'randomMatchingRejectButton') {
        await message.delete();
        // prevInteraction.reply('사용자가 거절했어요.');
      }
    }
  },
};
