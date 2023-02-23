const {
  Events,
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require('discord.js');
const { embed, components } = require('../../components/embedBuilder');

let prevInteraction;

module.exports = {
  name: Events.InteractionCreate,
  once: false,
  /**
   *
   * @param {import('discord.js').Interaction} interaction
   */
  async execute(interaction) {
    if (
      interaction.message?.interaction?.commandName !== '임베드만들기' &&
      interaction?.commandName !== '임베드만들기'
    )
      return;
    if (interaction.isChatInputCommand()) {
      prevInteraction = interaction;
      await interaction.reply({
        embeds: [embed],
        components: components,
        ephemeral: true,
      });
    } else if (interaction.isButton()) {
      switch (interaction.customId) {
        case 'embedBuilderEditContentButton': {
          const modal = new ModalBuilder({ custom_id: 'contentModal', title: 'Edit Content' });
          const titleInput = new TextInputBuilder({
            custom_id: 'titleInput',
            label: '제목을 입력하세요',
            style: TextInputStyle.Short,
          });
          const contentInput = new TextInputBuilder({
            custom_id: 'contentInput',
            label: '내용을 입력하세요',
            style: TextInputStyle.Paragraph,
          });
          const firstActionRow = new ActionRowBuilder().addComponents(titleInput);
          const secondActionRow = new ActionRowBuilder().addComponents(contentInput);
          modal.addComponents(firstActionRow, secondActionRow);
          await interaction.showModal(modal);
        }
      }
    } else if (interaction.isModalSubmit() && interaction.customId === 'contentModal') {
      const title = interaction.fields.getTextInputValue('titleInput');
      const content = interaction.fields.getTextInputValue('contentInput');
      prevInteraction.editReply({ embed: [embed] });
      await interaction.reply({ content: '수정완료', ephemeral: true });
      await interaction.deleteReply();
    }
  },
};
