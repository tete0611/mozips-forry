const {
  Events,
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ComponentType,
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
      await interaction.reply({
        embeds: [embed],
        components: components,
        ephemeral: true,
      });
      /** 버튼 수신 필터등록 */
      const filter = i =>
        i.customId === 'embedBuilderEditContentButton' && i.user.id === interaction.user.id;
      const collector = interaction.channel.createMessageComponentCollector({
        filter: filter,
        time: 15000,
      });
      /** 버튼 콜렉터 등록 */
      collector.on('collect', async buttonInteraction => {
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
        buttonInteraction.showModal(modal);
        // collector.stop();
        const inputCollector = buttonInteraction.channel.createMessageComponentCollector({
          componentType: ComponentType.TextInput,
          time: 30000,
        });
        inputCollector.on('collect', async m => {
          console.log('발동요');
        });
      });
      // /** 모달 콜렉터 등록 */

      // prevInteraction = await interaction.fetchReply();
    } else if (interaction.isButton()) {
      // switch (interaction.customId) {
      //   case 'embedBuilderEditContentButton': {
      //     const modal = new ModalBuilder({ custom_id: 'contentModal', title: 'Edit Content' });
      //     const titleInput = new TextInputBuilder({
      //       custom_id: 'titleInput',
      //       label: '제목을 입력하세요',
      //       style: TextInputStyle.Short,
      //     });
      //     const contentInput = new TextInputBuilder({
      //       custom_id: 'contentInput',
      //       label: '내용을 입력하세요',
      //       style: TextInputStyle.Paragraph,
      //     });
      //     const firstActionRow = new ActionRowBuilder().addComponents(titleInput);
      //     const secondActionRow = new ActionRowBuilder().addComponents(contentInput);
      //     modal.addComponents(firstActionRow, secondActionRow);
      //     await interaction.showModal(modal);
      //   }
      // }
    } else if (interaction.isModalSubmit() && interaction.customId === 'contentModal') {
      // const title = interaction.fields.getTextInputValue('titleInput');
      // const content = interaction.fields.getTextInputValue('contentInput');
      // const newEmbed = new EmbedBuilder().setTitle(title).setDescription(content);
      // console.log(prevInteraction.embeds);
      // prevInteraction.edit({ embed: [newEmbed] });
      // await interaction.reply({ content: '수정완료', ephemeral: true });
      // await interaction.deleteReply();
    }
  },
};
