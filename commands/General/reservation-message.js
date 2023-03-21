const { SlashCommandBuilder, ChannelType, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('예약메시지')
    .setDescription('예약 메시지를 등록할 수 있습니다.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    /** 반복안함 */
    .addSubcommand(subCommand =>
      subCommand
        .setName('반복안함')
        .setDescription('반복 예약을 사용하지않습니다.')
        /** 년도 */
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
        /** 시간 */
        .addIntegerOption(option =>
          option
            .setName('시간')
            .setDescription('0~23 사이의 값을 입력해주세요.')
            .setRequired(true)
            .setMinValue(0)
            .setMaxValue(23),
        )
        /** 분 */
        .addIntegerOption(option =>
          option
            .setName('분')
            .setDescription('분을 입력해 주세요.')
            .setRequired(true)
            .setMinValue(0)
            .setMaxValue(59),
        )
        /** 메시지 */
        .addStringOption(option =>
          option
            .setName('메시지')
            .setDescription('메시지를 작성해주세요')
            .setMinLength(1)
            .setMaxLength(2000)
            .setRequired(true),
        )
        /** 채널 */
        .addChannelOption(option =>
          option
            .setName('채널')
            .setDescription('채널을 선택하세요')
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildText),
        ),
    )
    /** 반복함 */
    .addSubcommand(subCommand =>
      subCommand
        .setName('반복')
        .setDescription('반복 예약을 사용합니다.')
        /** 시간 */
        .addIntegerOption(option =>
          option
            .setName('시간')
            .setDescription('0~23 사이의 값을 입력해주세요.')
            .setRequired(true)
            .setMinValue(0)
            .setMaxValue(23),
        )
        /** 분 */
        .addIntegerOption(option =>
          option
            .setName('분')
            .setDescription('분을 입력해 주세요.')
            .setRequired(true)
            .setMinValue(0)
            .setMaxValue(59),
        )
        /** 요일 */
        .addIntegerOption(option =>
          option
            .setName('요일')
            .setDescription('요일을 선택해 주세요.')
            .addChoices(
              { name: '일', value: 0 },
              { name: '월', value: 1 },
              { name: '화', value: 2 },
              { name: '수', value: 3 },
              { name: '목', value: 4 },
              { name: '금', value: 5 },
              { name: '토', value: 6 },
              { name: '모두', value: 7 },
            )
            .setRequired(true),
        )
        /** 메시지 */
        .addStringOption(option =>
          option
            .setName('메시지')
            .setDescription('메시지를 작성해주세요')
            .setMinLength(1)
            .setMaxLength(2000)
            .setRequired(true),
        )
        /** 채널 */
        .addChannelOption(option =>
          option
            .setName('채널')
            .setDescription('채널을 선택하세요')
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildText),
        ),
    )
    .addSubcommand(subCommand =>
      subCommand.setName('조회').setDescription('등록된 메시지를 조회합니다.'),
    )
    .addSubcommand(subCommand =>
      subCommand
        .setName('삭제')
        .setDescription('등록된 일정을 삭제합니다.')
        .addStringOption(option =>
          option
            .setName('아이디')
            .setDescription('삭제할 일정의 ID를 넣어주세요')
            .setRequired(true),
        ),
    ),

  /**
   *
   * @param {import("discord.js").CommandInteraction} interaction
   */
  async execute(interaction) {},
};
