const { SlashCommandBuilder } = require('discord.js');

let waitingRoom;
let waitingRoomMember;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('랜덤매칭')
    .setDescription('1:1 사용자 랜덤매칭 명령어를 사용해보세요!'),
  /**
   *
   * @param {import("discord.js").CommandInteraction} interaction
   */
  async execute(interaction) {
    const { channelId, client } = interaction;
    const myTag = interaction.user.tag;
    const guild = client.guilds.cache.get('1059355706509238294');
    const randomRoom = client.channels.cache.get('1059355707092242475');
    const channel = await interaction.guild.channels
      .fetch(channelId)
      .then(v => console.log(v.members.map(v2 => v2.nickname)));
    // console.log(channel.members?.map(v => v.user.tag));
    // const waitingRoom = interaction.channel.fetch().then(v => console.log(v.members));
    // const waitingRoomMember = waitingRoom.members.map(v => v.user.tag);
    return;
    /** 대기방에 내가 있는지 판별 */
    // console.log(waitingRoomMember.map(v => v));
    // console.log(myTag);
    if (!waitingRoomMember.includes(myTag))
      return interaction.reply({ content: '대기방에 먼저 입장해주세요.', ephemeral: true });
    /** 대기방에 2명 이상인지 판별 */
    if (!waitingRoomMember.length < 2)
      return interaction.reply({ content: '대기방에 충분한 사용자가 없어요.', ephemeral: true });
    await guild.members
      .fetch()
      .then(members => {
        members.forEach(member => {
          member.voice
            .setChannel(randomRoom)
            .then(() => {
              console.log(`${member.user.tag}가 채널에 추가되었습니다.`);
            })
            .catch(console.error);
        });
      })
      .catch(console.error);
  },
};
