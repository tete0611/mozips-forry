const {
  Events,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require('discord.js');

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
      const embed = new EmbedBuilder({
        title: 'Mozips Embed Builder',
        description:
          'Use the button below to edit and then send your embed.\n\nAs you edit, you`ll see a live preview here!',
      })
        .setImage(
          'https://static.wixstatic.com/media/3b6a39_310aaf5e6eab4563b71463019abbff52~mv2.jpg/v1/fill/w_284,h_284,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/001%20(1).jpg',
        )
        .setThumbnail('https://i.ibb.co/gSZ0jQR/mozips-logo.png')
        .setColor('White');
      /** 버튼들 */
      const editContentButton = new ButtonBuilder({
        custom_id: 'embedBuilderEditContentButton',
        label: 'Edit Content',
        style: ButtonStyle.Primary,
      });
      const editColorButton = new ButtonBuilder({
        custom_id: 'embedBuilderEditColorButton',
        label: 'Edit Color',
        style: ButtonStyle.Secondary,
      });

      const editImageButton = new ButtonBuilder({
        custom_id: 'embedBuilderEditImageButton',
        label: 'Edit Image',
        style: ButtonStyle.Secondary,
      });

      const editAuthorButton = new ButtonBuilder({
        custom_id: 'embedBuilderEditAuthorButton',
        label: 'Edit Image',
        style: ButtonStyle.Secondary,
      });

      const editFooterButton = new ButtonBuilder({
        custom_id: 'embedBuilderEditFooterButton',
        label: 'Edit Footer',
        style: ButtonStyle.Secondary,
      });

      const sendButton = new ButtonBuilder({
        custom_id: 'embedBuilderSendButton',
        label: 'Send',
        style: ButtonStyle.Success,
      });

      const cancelButton = new ButtonBuilder({
        custom_id: 'embedBuilderCancelButton',
        label: 'Cancel',
        style: ButtonStyle.Danger,
      });

      /** row 들 */
      const row_1 = new ActionRowBuilder({
        components: [editContentButton, editColorButton, editImageButton],
      });
      const row_2 = new ActionRowBuilder({ components: [editAuthorButton, editFooterButton] });
      const row_3 = new ActionRowBuilder({ components: [sendButton, cancelButton] });
      prevInteraction = interaction;
      await interaction.reply({
        embeds: [embed],
        components: [row_1, row_2, row_3],
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
      console.log({ title });
      console.log({ content });
      const embed = new EmbedBuilder({
        title: title,
        description: content,
      });
      prevInteraction.editReply({ embed: [embed] });
      await interaction.reply({ content: '수정완료', ephemeral: true });
      await interaction.deleteReply();
    }
  },
};
