module.exports = {
  name: 'interactionCreate',
  once: false,
  /**
   *
   * @param {import("discord.js").Interaction} interaction
   */
  execute(interaction) {
    // 모달제출 이벤트인 경우
    if (interaction.isModalSubmit()) {
      if (interaction.customId === 'myModal') {
        const title = interaction.fields.getTextInputValue('titleId');
        const content = interaction.fields.getTextInputValue('contentId');

        interaction.reply({
          content: `모달 제출 성공 (제목:${title} / 내용:${content})`,
        });
      }
    }
    // 버튼 클릭인 경우
    else if (interaction.isButton()) console.log(interaction);
  },
};
