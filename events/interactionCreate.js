module.exports = {
  name: 'interactionCreate',
  once: false,
  /**
   *
   * @param {import("discord.js").ModalSubmitInteraction} interaction
   */
  execute(interaction) {
    if (interaction.customId === 'myModal') {
      const title = interaction.fields.getTextInputValue('titleId');
      const content = interaction.fields.getTextInputValue('contentId');

      interaction.reply({
        content: `모달 제출 성공 (제목:${title} / 내용:${content})`,
      });
    }
  },
};
