const { MessageFlags, ChannelType, Events, EmbedBuilder, Colors } = require('discord.js');
const { addMinutes } = require('date-fns');
const schedule = require('node-schedule');
const { row_1 } = require('../../components/randomMatching');

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
   * @param {import("discord.js").Interaction} interaction
   */
  async execute(interaction) {
    const greeting = new EmbedBuilder({
      title: ':wave: 랜덤방에 초대되었습니다! :wave:',
      description:
        '자유롭게 채팅&대화를 나누세요!\n방에 혼자 남았을 경우 방이 자동삭제 됩니다.\n\n :wave: **Welcome to Random Room!** :wave:\nFeel free to talk and chat.\nIf you are left alone, the room will be automatically deleted.',
      color: Colors.Yellow,
    });

    try {
      const { commandName, options } = interaction;
      if (commandName === '랜덤매칭') {
        if (options.getSubcommand() === '개인') {
          const {
            client,
            user: myUser,
            member: ownerMember,
            channel: waitingRoom,
            guild,
          } = interaction;
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
              interaction.editReply('상대방이 승락했어요! :wave:');
              const newChannel = await guild.channels.create({
                name: `랜덤방`,
                type: ChannelType.GuildVoice,
                parent: process.env.RANDOM_ROOM_PARENT_ID,
                userLimit: 2,
              });
              const newDescription =
                greeting.data.description + `\n<@${myUser.id}> <@${selectedUser.id}>`;
              greeting.setDescription(newDescription);
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
          interaction.deferReply({
            ephemeral: true,
          });
          collector.on('end', () => {
            isEnd = true;
            if (!interaction.replied) interaction.editReply('상대방이 응답하지 않았어요.');
          });
          /** 전체매칭인 경우 */
        } else if (options.getSubcommand() === '전체') {
          const { guild, options: thisOptions, channel: waitingRoom } = interaction;
          const limitTime = thisOptions.getInteger('제한시간설정');
          const waitingRoomMembers = shuffle(waitingRoom.members.map(v => v));
          const waitingRoomMemberLength = waitingRoomMembers.length;
          const loop = ~~(waitingRoomMemberLength / 2);
          if (loop === 0)
            return interaction.reply({
              content: '대기방에 충분한 사람이 없어요.',
              ephemeral: true,
            });
          else await interaction.reply({ content: '매칭중.....' });
          /** 방 생성 시작 */
          try {
            for (let i = 0; i < loop; i++) {
              let limitMember = 2;
              let newDescription;
              const totalMember = [];
              const member_1 = waitingRoomMembers.pop(0);
              const member_2 = waitingRoomMembers.pop(0);
              newDescription =
                greeting.data.description + `\n<@${member_1.user.id}> <@${member_2.user.id}>`;
              totalMember.push(member_1);
              totalMember.push(member_2);
              if (waitingRoomMembers.length === 1) {
                limitMember = 3;
                const member_3 = waitingRoomMembers.pop(0);
                totalMember.push(member_3);
                newDescription += ` <@${member_3.user.id}>`;
              }
              const newChannel = await guild.channels.create({
                name: `랜덤방`,
                type: ChannelType.GuildVoice,
                parent: process.env.RANDOM_ROOM_PARENT_ID,
                userLimit: limitMember,
              });
              greeting.setDescription(newDescription).setFields(
                { name: '\u200B', value: '\u200B' },
                {
                  name: '제한시간 (Time Limit)',
                  value: limitTime ? `__${limitTime} min__` : '__없음__',
                },
              );
              newChannel.send({
                embeds: [greeting],
              });
              totalMember.forEach(v => {
                v.voice.setChannel(newChannel);
              });
              if (limitTime) {
                const time = new Date();
                schedule.scheduleJob(addMinutes(time, limitTime - 1), async () => {
                  const room = await guild.channels.cache.get(newChannel.id);
                  if (room)
                    await newChannel.send({ content: '1분 남았습니다. 대화를 마무리해주세요!' });
                  else {
                    job_1.cancel();
                  }
                });
                const job_1 = schedule.scheduleJob(addMinutes(time, limitTime), async () => {
                  const room = await guild.channels.cache.get(newChannel.id);
                  if (room) await newChannel.delete();
                });
              }
            }
            interaction.editReply({
              content: `__${waitingRoomMemberLength}명__이 매칭되었습니다.`,
            });
          } catch (err) {
            console.error('(에러발생)/랜덤매칭 전체 : ' + err);
            interaction.editReply({ content: `매칭에 에러가 발생했어요.`, ephemeral: true });
          }
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
