const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`임베드만들기`)
    .setDescription('send a message for reaction roles in the currently selected active channel'),
  /**
   *
   * @param {import("discord.js").CommandInteraction} interaction
   */
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;
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

    await interaction.reply({
      embeds: [embed],
      components: [row_1, row_2, row_3],
    });
  },
};
