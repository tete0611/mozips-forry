const {
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  MessageFlags,
  ChannelType,
  Events,
} = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
const { addMinutes } = require('date-fns');
const schedule = require('node-schedule');

let ownerMember;
let prevInteraction;

const shuffle = array => {
  array.sort(() => Math.random() - 0.5);
  return array;
};

module.exports = {
  name: Events.InteractionCreate,
  once: false,
  /**
   *
   * @param {import("discord.js").Interaction} interaction
   */
  async execute(interaction) {
    try {
      const { commandName, options } = interaction;
      if (commandName === '랜덤매칭') {
        if (options.getSubcommand() === '개인') {
          const { client, user: myUser, member, channel: waitingRoom } = interaction;
          prevInteraction = interaction;
          ownerMember = member;
          const myTag = myUser.tag;
          const waitingRoomMembers = waitingRoom.members.map(v => v);
          /** 대기방에 내가 있는지 판별 */
          if (!waitingRoomMembers.some(v => v.user.tag === myTag))
            return interaction.reply({ content: '대기방에 먼저 입장해주세요.', ephemeral: true });
          /** 대기방에서 자기자신 제거 */
          const filterMembers = waitingRoomMembers.filter(v => v.user.tag !== myTag);
          /** 랜덤 대화상대가 있는지 판별 */
          if (filterMembers.length < 1)
            return interaction.reply({
              content: '대기방에 충분한 사용자가 없어요.',
              ephemeral: true,
            });
          /** 랜덤으로 사용자 선정 */
          const randomNumber = ~~(Math.random() * filterMembers.length);
          /** 선정된 사용자의 Member객체 */
          const selectedMember = filterMembers[randomNumber];
          /** 선정된 사용자의 User객체 */
          const selectedUser = await client.users.fetch(selectedMember.user.id);
          const sendButton = new ButtonBuilder({
            custom_id: 'randomMatchingConfirmButton',
            label: '참가',
            style: ButtonStyle.Success,
          });

          const cancelButton = new ButtonBuilder({
            custom_id: 'randomMatchingRejectButton',
            label: '거절',
            style: ButtonStyle.Danger,
          });

          const row1 = new ActionRowBuilder({ components: [sendButton, cancelButton] });

          selectedUser.send({
            content: `랜덤매칭에 상대로 선택되었습니다. 참가 하시겠어요?`,
            components: [row1],
            flags: MessageFlags.Ephemeral,
            // allowedMentions: {
            //   users: [selectedUser.id],
            // },
          });
          prevInteraction.deferReply({
            ephemeral: true,
          });
          await wait(30000);
          if (!prevInteraction.replied) prevInteraction.editReply('상대방이 응답하지 않았어요.');
          /** 전체매칭인 경우 */
        } else if (options.getSubcommand() === '전체') {
          const { guild, options: thisOptions, channel: waitingRoom } = interaction;
          const limitTime = thisOptions.getInteger('제한시간설정');
          const waitingRoomMembers = shuffle(waitingRoom.members.map(v => v));
          // const dummyNum = shuffle([...Array(11)].map((_, i) => i));
          const waitingRoomMemberLength = waitingRoomMembers.length;
          const loop = ~~(waitingRoomMemberLength / 2);
          if (loop === 0)
            return interaction.reply({
              content: '대기방에 충분한 사람이 없어요.',
              ephemeral: true,
            });
          try {
            for (let i = 0; i < loop; i++) {
              let limitMember = 2;
              const totalMember = [];
              const member_1 = waitingRoomMembers.pop(0);
              const member_2 = waitingRoomMembers.pop(0);
              totalMember.push(member_1);
              totalMember.push(member_2);
              if (waitingRoomMembers.length === 1) {
                limitMember = 3;
                const member_3 = waitingRoomMembers.pop(0);
                totalMember.push(member_3);
              }
              const newChannel = await guild.channels.create({
                name: `랜덤방`,
                type: ChannelType.GuildVoice,
                parent: process.env.RANDOM_ROOM_PARENT_ID,
                userLimit: limitMember,
              });
              await totalMember.forEach(async v => await v.voice.setChannel(newChannel));

              if (limitTime) {
                const time = new Date();
                schedule.scheduleJob(addMinutes(time, limitTime), () => {
                  newChannel.delete();
                });
              }
            }
            interaction.reply({ content: `__${waitingRoomMemberLength}명__이 매칭되었습니다.` });
          } catch (err) {
            console.error('(에러발생)/랜덤매칭 전체 : ' + err);
          }
        }
      }
      // else if (interaction.isModalSubmit()) {
      //   /** 모달 제출일 경우 */
      //   if (interaction.customId === 'myModal') {
      //     const title = interaction.fields.getTextInputValue('titleId');
      //     const content = interaction.fields.getTextInputValue('contentId');

      //     interaction.reply({
      //       content: `모달 제출 성공 (제목:${title} / 내용:${content})`,
      //     });
      //   }
      // }
      /** 랜덤매칭 버튼일 경우 */
      else if (
        interaction.customId === 'randomMatchingConfirmButton' ||
        interaction.customId === 'randomMatchingRejectButton'
      ) {
        const { client, user, message } = interaction;

        const guild = await client.guilds.fetch(process.env.GUILD_ID);
        const seledtedmember = await guild.members.fetch(user);
        // const resultMember = [ownerMember, seledtedmember];
        if (!prevInteraction || prevInteraction.replied)
          return message.edit({ content: '만료 되었습니다.', components: [] });

        if (interaction.customId === 'randomMatchingConfirmButton') {
          const newChannel = await guild.channels.create({
            name: `랜덤방`,
            type: ChannelType.GuildVoice,
            parent: process.env.RANDOM_ROOM_PARENT_ID,
            userLimit: 2,
          });
          if (prevInteraction) prevInteraction.editReply('상대방이 승락했어요.');
          await ownerMember.voice.setChannel(newChannel);
          await seledtedmember.voice.setChannel(newChannel);
          await message.edit({ content: '참가 완료', components: [] });
        } else if (interaction.customId === 'randomMatchingRejectButton') {
          await message.edit({ content: '거절 완료', components: [] });
          if (prevInteraction) prevInteraction.editReply('상대방이 거절했어요.');
        }
      }
    } catch (error) {
      console.error(error);
    }
  },
};
