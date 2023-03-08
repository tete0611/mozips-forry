const { format, addMinutes } = require('date-fns');
const { ko } = require('date-fns/locale/ko');
const { ChannelType } = require('discord.js');
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
   * @param {import('discord.js').GuildMember[]} arr - 랜덤매칭될 1차원 멤버배열
   * @returns {import('discord.js').GuildMember[][]}
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
  // /**
  //  * 랜덤매칭 반복 함수
  //  * @param {import('discord.js').GuildMember[]} waitingRoomMembers - 매칭참가자들
  //  * @param {import('discord.js').GuildMember[]} teacherList - 선생님들
  //  * @param {import('discord.js').Interaction} interaction - 해당 interaction 객체
  //  * @param {import('discord.js').EmbedBuilder} embed - 게시될 임베드
  //  * @param {number} loop - 게시될 임베드
  //  */
  // onRandomMatching: async (waitingRoomMembers, teacherList = [], interaction, embed, limitTime) => {
  //   const { guild } = interaction;
  //   const waitingRoomMemberLength = waitingRoomMembers.length;
  //   const loop = ~~(waitingRoomMemberLength / 2);
  //   if (loop === 0)
  //     return interaction.reply({
  //       content: '대기방에 충분한 사람이 없어요.',
  //       ephemeral: true,
  //     });
  //   else await interaction.reply({ content: '매칭중.....' });
  //   try {
  //     for (let i = 0; i < loop; i++) {
  //       let limitMember = 2;
  //       let newDescription;
  //       const totalMember = [];
  //       const member_1 = waitingRoomMembers.pop(0);
  //       const member_2 = waitingRoomMembers.pop(0);
  //       newDescription = embed.data.description + `\n<@${member_1.user.id}> <@${member_2.user.id}>`;
  //       totalMember.push(member_1);
  //       totalMember.push(member_2);
  //       if (waitingRoomMembers.length === 1) {
  //         limitMember = 3;
  //         const member_3 = waitingRoomMembers.pop(0);
  //         totalMember.push(member_3);
  //         newDescription += ` <@${member_3.user.id}>`;
  //       }
  //       const newChannel = await guild.channels.create({
  //         name: `랜덤방`,
  //         type: ChannelType.GuildVoice,
  //         parent: process.env.RANDOM_ROOM_PARENT_ID,
  //         userLimit: limitMember,
  //       });
  //       embed.setDescription(newDescription).setFields(
  //         { name: '\u200B', value: '\u200B' },
  //         {
  //           name: '제한시간 (Time Limit)',
  //           value: limitTime ? `__${limitTime} min__` : '__없음__',
  //         },
  //       );
  //       newChannel.send({
  //         embeds: [embed],
  //       });
  //       totalMember.forEach(v => {
  //         v.voice.setChannel(newChannel);
  //       });
  //       if (limitTime) {
  //         const time = new Date();
  //         schedule.scheduleJob(addMinutes(time, limitTime - 1), async () => {
  //           const room = await guild.channels.cache.get(newChannel.id);
  //           if (room) await newChannel.send({ content: '1분 남았습니다. 대화를 마무리해주세요!' });
  //           else {
  //             job_1.cancel();
  //           }
  //         });
  //         const job_1 = schedule.scheduleJob(addMinutes(time, limitTime), async () => {
  //           const room = await guild.channels.cache.get(newChannel.id);
  //           if (room) await newChannel.delete();
  //         });
  //       }
  //     }
  //     interaction.editReply({
  //       content: `__${waitingRoomMemberLength}명__이 매칭되었습니다.`,
  //     });
  //   } catch (err) {
  //     console.error('(에러발생)/랜덤매칭 전체 : ' + err);
  //     interaction.editReply({ content: `매칭에 에러가 발생했어요.`, ephemeral: true });
  //   }
  // },
};
