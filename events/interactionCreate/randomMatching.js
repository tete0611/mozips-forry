const { MessageFlags, ChannelType, Events, EmbedBuilder, Colors } = require('discord.js');
const { row_1 } = require('../../components/randomMatching');
const { getTwoDimensions, onNormalMatch, getImageUrl } = require('../../common/function');
const { env } = process;

const teacherRoomId = env.TEACHER_ROOM_ID;

const shuffle = array => {
  array.sort(() => Math.random() - 0.5);
  return array;
};

let isEnd = true;

module.exports = {
  name: Events.InteractionCreate,
  once: false,
  /**
   *
   * @param {import("discord.js").CommandInteraction} interaction
   */
  async execute(interaction) {
    try {
      const { commandName, options } = interaction;
      if (commandName === '랜덤매칭') {
        if (options.getSubcommand() === '개인') {
          const {
            client,
            user: ownerUser,
            member: ownerMember,
            channel: waitingRoom,
            guild,
          } = interaction;
          const waitingRoomMembers = waitingRoom.members.map(v => v);
          /** 대기방에 내가 있는지 판별 */
          if (!waitingRoomMembers.some(v => v.user.tag === ownerUser.tag))
            return interaction.reply({ content: '대기방에 먼저 입장해주세요.', ephemeral: true });
          /** 대기방에서 자기자신 제거 */
          const filterMembers = waitingRoomMembers.filter(v => v.user.tag !== ownerUser.tag);
          /** 랜덤 대화상대가 있는지 판별 */
          if (filterMembers.length < 1)
            return interaction.reply({
              content: '대기방에 충분한 사용자가 없어요.',
              ephemeral: true,
            });
          await interaction.deferReply({
            ephemeral: true,
          });
          /** 랜덤으로 사용자 선정 */
          const randomNumber = ~~(Math.random() * filterMembers.length);
          /** 선정된 사용자의 Member객체 */
          const selectedMember = filterMembers[randomNumber];
          /** 선정된 사용자의 User객체 */
          const selectedUser = await client.users.fetch(selectedMember.user.id);
          const DM_Channel = await selectedUser.createDM();
          const filter = i =>
            (i.customId === 'randomMatchingConfirmButton' ||
              i.customId === 'randomMatchingRejectButton') &&
            i.user.id === selectedUser.id;
          const collector = DM_Channel.createMessageComponentCollector({
            filter: filter,
            time: 30000,
          });
          collector.on('collect', async buttonInteraction => {
            const { message } = buttonInteraction;
            if (buttonInteraction.customId === 'randomMatchingConfirmButton') {
              /** 송신자가 대기방에 있는지 판별 */
              if (!ownerMember.voice.channel) {
                await buttonInteraction.update({
                  content: '상대방이 대기방에 존재하지 않습니다',
                  components: [],
                });
                interaction.editReply('대기방에 참가해있지 않은거 같아요');
                return;
              }
              /** 수신자가 대기방에 있는지 판별 */
              if (!selectedMember.voice.channel) {
                await buttonInteraction.update({
                  content: '대기방에 참가해서 클릭해주세요',
                });
                return;
              }
              interaction.editReply('상대방이 승락했어요! :wave:');
              const newChannel = await guild.channels.create({
                name: `랜덤방`,
                type: ChannelType.GuildVoice,
                parent: process.env.RANDOM_ROOM_PARENT_ID,
                userLimit: 2,
              });
              const greeting = new EmbedBuilder({
                title: ':wave: Welcome to random VC :wave:',
                description: `자유롭게 채팅&대화를 나누세요!\n방에 혼자 남았을 경우 방이 자동삭제 됩니다.\n\n :wave: **Welcome to Random Room!** :wave:\nFeel free to talk and chat.\nIf you are left alone, the room will be automatically deleted.\n<@${ownerUser.id}> <@${selectedUser.id}>`,
                color: Colors.Yellow,
              });
              newChannel.send({
                embeds: [greeting],
              });
              await ownerMember.voice.setChannel(newChannel);
              await selectedMember.voice.setChannel(newChannel);
              message.edit({
                content: `참가 완료 <#${newChannel.id}>`,
                components: [],
              });
            } else if (buttonInteraction.customId === 'randomMatchingRejectButton') {
              interaction.editReply('상대방이 거절했어요 :pensive:');
              message.edit({ content: '거절 완료', components: [] });
            }
          });
          DM_Channel.send({
            content: `랜덤매칭에 상대로 선택되었습니다. 참가 하시겠어요?`,
            components: [row_1],
            flags: MessageFlags.Ephemeral,
          });
          isEnd = false;
          collector.on('end', () => {
            isEnd = true;
            if (!interaction.replied) interaction.editReply('상대방이 응답하지 않았어요.');
          });
          /** 전체매칭인 경우 */
        } else if (options.getSubcommand() === '전체') {
          const { options: thisOptions, channel: waitingRoom, guild } = interaction;
          const today = new Date();
          const limitTime = thisOptions.getInteger('제한시간설정');
          const isTeacher = thisOptions.getBoolean('선생님');
          const waitingRoomMembers = shuffle(waitingRoom.members.map(v => v));
          const waitingRoomMemberLength = waitingRoomMembers.length;
          let resultMembers = null;
          /** 선생님 매칭일 경우 */
          if (isTeacher) {
            const teacherRoom = await guild.channels.cache.get(teacherRoomId);
            const teacherRoomMembers = shuffle(teacherRoom.members.map(v => v));
            const teacherRoomMembersLength = teacherRoomMembers.length;
            if (teacherRoomMembersLength < 1)
              return interaction.reply({ content: '대기방에 선생님이 없어요.', ephemeral: true });
            if (waitingRoomMemberLength < 1)
              return interaction.reply({ content: '대기방에 사람이 없어요.', ephemeral: true });

            const combineRoomMembers = [];
            for (let i = 0; i < Math.min(teacherRoomMembersLength, waitingRoomMemberLength); i++) {
              combineRoomMembers.push(teacherRoomMembers.pop(0));
              combineRoomMembers.push(waitingRoomMembers.pop(0));
            }
            resultMembers = getTwoDimensions(combineRoomMembers);
            /** 일반 매칭일 경우 */
          } else {
            if (waitingRoomMemberLength < 2)
              return interaction.reply({
                content: '대기방에 충분한 사람이 없어요.',
                ephemeral: true,
              });
            /** 2차원 배열 제작 */
            resultMembers = getTwoDimensions(waitingRoomMembers);
          }
          await interaction.reply({ content: '매칭중.....' });
          /** 비동기 랜덤매칭 실행 */
          Promise.allSettled(
            resultMembers.map(v => onNormalMatch(v, interaction, limitTime, today)),
          )
            .catch(err => console.log('랜덤매칭 에러발생 : ' + err))
            .finally(() => {
              interaction.editReply({ content: `매칭되었습니다` });
            });
        }
      } else if (
        /** 랜덤매칭 버튼일 경우 */
        interaction.customId === 'randomMatchingConfirmButton' ||
        interaction.customId === 'randomMatchingRejectButton'
      ) {
        if (isEnd) interaction.update({ content: '만료된 요청입니다.', components: [] });
      }
    } catch (error) {
      console.error(error);
    }
  },
};
