const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
// let waitingRoom;
// let waitingRoomMember;
let myMember = null;
let prevInteraction = null;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('랜덤매칭')
    .setDescription('1:1 사용자 랜덤매칭 명령어를 사용해보세요!'),
  /**
   *
   * @param {import("discord.js").CommandInteraction} interaction
   */
  async execute(interaction) {
    prevInteraction = interaction;
    const { channelId, client, user: myUser, member } = interaction;
    myMember = member;
    const myTag = myUser.tag;
    const guild = client.guilds.cache.get('1059355706509238294');
    const randomRoom = client.channels.cache.get('1059355707092242475');
    // const channel = await interaction.guild.channels
    //   .fetch(channelId)
    //   .then(v => console.log(v.members.map(v2 => v2.nickname)));
    const waitingRoom = client.channels.cache.get('1074873739382095902');
    const waitingRoomMember = waitingRoom.members.map(v => v);
    /** 대기방에 내가 있는지 판별 */
    if (!waitingRoomMember.some(v => v.user.tag === myTag))
      return interaction.reply({ content: '대기방에 먼저 입장해주세요.', ephemeral: true });
    waitingRoomMember.filter(v => v.user.tag !== myTag);
    /** 랜덤 대화상대가 있는지 판별 */
    if (waitingRoomMember.length < 1)
      return interaction.reply({ content: '대기방에 충분한 사용자가 없어요.', ephemeral: true });
    /** 랜덤으로 사용자 선정 */
    const randomNumber = ~~(Math.random() * waitingRoomMember.length);
    /** 선정된 사용자의 Member객체 */
    const selectedMember = waitingRoomMember[randomNumber];
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
    });
    interaction.deferReply();
    await wait(30000);
    interaction.reply('상대방이 응답하지 않았어요.');
    const resultMembers = [myMember, selectedMember];

    // await await resultMembers.forEach(v => {
    //   v.voice.setChannel(randomRoom);
    // });
    // await myMember.voice.setChannel(randomRoom);
    // await guild.members
    //   .fetch()
    //   .then(members => {
    //     members.forEach(member => {
    //       member.voice
    //         .setChannel(randomRoom)
    //         .then(() => {
    //           console.log(`${member.user.tag}가 채널에 추가되었습니다.`);
    //         })
    //         .catch(console.error);
    //     });
    //   })
    //   .catch(console.error);
  },
  myMember,
  prevInteraction,
};
