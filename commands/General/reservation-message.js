const { SlashCommandBuilder, ChannelType } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('예약메시지')
    .setDescription('예약 메시지를 등록할 수 있습니다.')
    /** 년 */
    .addIntegerOption(option =>
      option
        .setName('년도')
        .setDescription('4자리로 입력해 주세요.')
        .setMinValue(new Date().getFullYear())
        .setMaxValue(9999)
        .setRequired(true),
    )
    /** 월 */
    .addIntegerOption(option =>
      option
        .setName('월')
        .setDescription('월을 입력해 주세요.')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(12),
    )
    /** 일 */
    .addIntegerOption(option =>
      option
        .setName('일')
        .setDescription('일을 입력해 주세요.')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(31),
    )
    .addIntegerOption(option =>
      option
        .setName('시간')
        .setDescription('0~23 사이의 값을 입력해주세요.')
        .setRequired(true)
        .setMinValue(0)
        .setMaxValue(23),
    )
    .addIntegerOption(option =>
      option
        .setName('분')
        .setDescription('분을 입력해 주세요.')
        .setRequired(true)
        .setMinValue(0)
        .setMaxValue(59),
    )
    .addStringOption(option =>
      option
        .setName('메시지')
        .setDescription('메시지를 작성해주세요')
        .setMinLength(1)
        .setMaxLength(2000)
        .setRequired(true),
    )
    .addChannelOption(option =>
      option
        .setName('채널')
        .setDescription('채널을 선택하세요')
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildText),
    ),
  /**
   *
   * @param {import("discord.js").CommandInteraction} interaction
   */
  execute(interaction) {
    if (!interaction.isChatInputCommand()) return;
    const today = new Date();
    const year = interaction.options.getInteger('년도');
    const month = interaction.options.getInteger('월');
    const date = interaction.options.getInteger('일');
    const hour = interaction.options.getInteger('시간');
    const minute = interaction.options.getInteger('분');
    const totalDate = new Date(year, month - 1, date, hour, minute);
    if (today > totalDate)
      return interaction.reply({ content: '현재보다 이후 시간을 입력해주세요.' });
    interaction.reply({
      content: `${year}년${month}월${date}일 ${hour}:${
        minute < 10 ? '0' + minute : minute
      }에 메시지가 등록되었습니다.`,
    });
  },
};
