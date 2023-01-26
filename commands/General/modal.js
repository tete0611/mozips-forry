const {
  SlashCommandBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('모달').setDescription('모달 만들기입니다.'),
  /**
   *
   * @param {import("discord.js").CommandInteraction} interaction
   */
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;
    const modal = new ModalBuilder({ custom_id: 'myModal', title: '모달제목입니다' });
    const messageNameInput = new TextInputBuilder({
      custom_id: 'titleId',
      label: '제목을 입력하세요',
      style: TextInputStyle.Short,
    });
    const channelInput = new TextInputBuilder({
      custom_id: 'contentId',
      label: '내용을 입력하세요',
      style: TextInputStyle.Paragraph,
    });
    const firstActionRow = new ActionRowBuilder().addComponents(messageNameInput);
    const secondActionRow = new ActionRowBuilder().addComponents(channelInput);

    modal.addComponents(firstActionRow, secondActionRow);

    await interaction.showModal(modal);
  },
};
