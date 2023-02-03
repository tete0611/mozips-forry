const {
  SlashCommandBuilder,
  ChannelType,
  PermissionFlagsBits,
  EmbedBuilder,
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require('discord.js');
const { formatToUtc } = require('../../common/function');
const { parseDayToString } = require('../../common/parse');
const schedule = require('node-schedule');

let job = null;

module.exports = {
  jobList: [],
  data: new SlashCommandBuilder()
    .setName('예약메시지')
    .setDescription('예약 메시지를 등록할 수 있습니다.')
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
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
    ),

  /**
   *
   * @param {import("discord.js").CommandInteraction} interaction
   */
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;
    const today = new Date();
    const { options } = interaction;
    const message = options.getString('메시지');
    const year = options.getInteger('년도');
    const month = options.getInteger('월');
    const date = options.getInteger('일');
    const hour = options.getInteger('시간');
    const minute = options.getInteger('분');
    const channel = options.getChannel('채널');
    const day = options?.data[0]?.options[2]?.value;
    const totalDate = new Date(year, month - 1, date, hour, minute);
    const embed = new EmbedBuilder({
      title: message,
    });

    if (options.getSubcommand() === '반복안함') {
      if (today > totalDate)
        return interaction.reply({ content: '현재보다 이후 시간을 입력해주세요.' });
      job = schedule.scheduleJob(totalDate, () => channel.send({ embeds: [embed] }));
      this.jobList.push({
        type: '한번만',
        message: message,
        time: totalDate,
      });
      interaction.reply({
        content: `${year}년${month}월${date}일 ${hour}:${
          minute < 10 ? '0' + minute : minute
        }에 메시지가 등록되었습니다.`,
      });
    } else if (options.getSubcommand() === '반복') {
      job = schedule.scheduleJob(`0 ${minute} ${hour} * * ${day !== 7 ? day : '*'}`, () => {
        channel.send({ embeds: [embed] });
        this.jobList.filter(v => v.type === '반복' || (v.type === '한번만' && v.time > new Date()));
      });
      /** 등록 리스트에 삽입 */
      this.jobList.push({
        type: '반복',
        message: message,
        time: `${hour.toString().padStart(2, '0')}:${minute
          .toString()
          .padStart(2, '0')} , ${parseDayToString(day)}`,
      });
      // schedule.scheduleJob(`* * * * * *`, () => channel.send({ embeds: [embed] }));
      interaction.reply({
        content: `반복 메시지가 등록되었습니다. 시간 : __**${hour
          .toString()
          .padStart(2, '0')}:${minute
          .toString()
          .padStart(2, '0')}**__ , 요일 : __**${parseDayToString(day)}**__`,
      });
    } else if (options.getSubcommand() === '조회') {
      console.log(this.jobList);
      this.jobList.forEach(v => console.log(v.time > new Date()));
    }
  },
};
