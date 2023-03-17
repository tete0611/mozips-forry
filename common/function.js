const { format, addMinutes } = require('date-fns');
const { ko } = require('date-fns/locale/ko');
const { ChannelType, EmbedBuilder, Colors } = require('discord.js');
const schedule = require('node-schedule');

module.exports = {
  /**
   * 시간 포맷 함수
   * @param { Date } date iso 날짜
   * @param { string } dateFormat 포맷형식(선택)
   */
  formatToUtc: (date, dateFormat) => {
    return date
      ? format(new Date(date), dateFormat ?? 'yyyy-MM-dd HH:mm', {
          locale: ko,
        })
      : '-';
  },
  /**
   * 한국시간 -> 영국시간(-9시간) 변환함수
   * @param { Date } data 날짜(date time)
   *
   */
  convertUTC: date => {
    if (typeof date === 'object' && date instanceof Date) {
      return date.setHours(date.getHours() - 9);
    } else if (typeof date === 'number') {
      return date >= 9 ? date - 9 : date + 15;
    }
  },
  /**
   * 파파고에러 함수
   * @param {import('request').Response} response
   *
   */
  onPapagoError: response => {
    const { errorCode } = JSON.parse(response.body);
    switch (errorCode) {
      case 'N2MT05':
        return '이미 한국어가 포함되어있어요.';
      case 'N2MT02':
        return '지원하지 않는 나라의 언어입니다.';
      case 'N2MT08':
        return '너무 많은 글자를 번역에 시도했습니다.';
      case 'N2MT99':
        return '서버에러발생: 관리자에게 문의해주세요.';
      default:
        return response.body;
    }
  },

  /**
   * 랜덤매칭 2차원 멤버배열 제작함수
   * @param {import('discord.js').GuildMember[]} arr 랜덤매칭될 1차원 멤버배열
   * @returns {import('discord.js').GuildMember[][]} 2차원 멤버 배열
   */
  onTwoDimensions: arr => {
    const result = [];
    const loop = arr.length;
    for (let i = 2; i <= loop; i += 2) {
      result.push([arr.pop(i - 1), arr.pop(i)]);
      if (arr.length === 1) result.at(-1).push(arr.pop(i + 1));
    }
    return result;
  },

  /**
   * 랜덤매칭 함수
   * @param {import('discord.js').GuildMember[]} memberList 매칭 참가자의 1차원 배열
   * @param {import('discord.js').Interaction} interaction 해당 interaction 객체
   * @param {number} limitTime 제한시간
   * @param {Date} today 현재시각
   */
  onNormalMatch: async (memberList, interaction, limitTime, today) => {
    const { guild, client } = interaction;
    const waitingRoom = await client.channels.fetch(process.env.WAITING_ROOM_ID);
    const teacherRoom = await client.channels.fetch(process.env.TEACHER_ROOM_ID);
    /** 전송할 임베드 */
    const greeting = new EmbedBuilder({
      title: ':wave: Welcome to random VC :wave:',
      description: `${memberList
        .map(member => `<@${member.user.id}>`)
        .join(
          ' and ',
        )} are matched\n\n**아래 사진에서 대화 주제를 골라보세요!**\nChoose conversation topics from the picture below.\n당신이 방에서 나가면 이 채널이 자동으로 없어집니다. 주의하세요!\nIf you leave this channel, the channel will be automatically deleted. Be careful!\n\n**더 재미있는 대화를 위한 명령어**\nCommands for more fun conversation\n__/잰말놀이__:(tongue-twister sentences) 모집스봇이 한국어 잰말놀이 문장을 랜덤으로 보내줍니다.\n__/절대음감__: (tongue-twister words) 모집스봇이 발음하기 어려운 한국어 단어를 랜덤으로 보내줍니다.\n__/초성게임__: 모집스봇이 랜덤으로 초성을 제시합니다.`,
      color: Colors.Yellow,
      fields: [
        { name: '\u200B', value: '\u200B' },
        {
          name: '제한시간 (Time Limit)',
          value: limitTime ? `__${limitTime} min__` : '__없음__',
        },
      ],
    });
    const newChannel = await guild.channels.create({
      name: `랜덤방`,
      type: ChannelType.GuildVoice,
      parent: process.env.RANDOM_ROOM_PARENT_ID,
      userLimit: memberList.length,
    });
    newChannel.send({
      embeds: [greeting],
    });
    memberList.forEach(member => member.voice.setChannel(newChannel));
    if (limitTime) {
      const isTeacher = memberList[0].roles.cache.some(v => v.name === '한국어 선생님');

      schedule.scheduleJob(addMinutes(today, limitTime - 1), async () => {
        const room = await guild.channels.cache.get(newChannel.id);
        if (room) await newChannel.send({ content: '1분 남았습니다. 대화를 마무리해주세요!' });
        else {
          job_1.cancel();
        }
      });
      const job_1 = schedule.scheduleJob(addMinutes(today, limitTime), async () => {
        const room = await guild.channels.cache.get(newChannel.id);
        if (room) {
          if (isTeacher) await memberList[0].voice.setChannel(teacherRoom);
          else memberList[0].voice.setChannel(waitingRoom);
        }
      });
    }
  },
  /**
   * 멤버가 해당 역할이 있는지 판별해주는 함수
   * @param {import('discord.js').GuildMember} member 멤버변수
   * @param {string} roleName 역할명
   * @returns {boolean}
   */
  onCheckRole: (member, roleName) => {
    return member.roles.cache.some(v => v.name === roleName);
  },
};
