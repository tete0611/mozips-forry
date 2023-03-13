const { Events } = require('discord.js');
const parentId = process.env.RANDOM_ROOM_PARENT_ID;

module.exports = {
  name: Events.VoiceStateUpdate,
  once: false,
  /**
   *
   * @param {import("discord.js").VoiceState} oldState
   * @param {import("discord.js").VoiceState} newState
   */
  async execute(oldState) {
    const { channel, channelId, guild } = oldState;
    if (channel?.parent?.id === parentId && channel?.name === '랜덤방') {
      /** 이탈한 채널의 멤버가 혼자이고 채널이 존재한다면 */
      if (channel?.members.size === 1) {
        const fetchChannel = await guild.channels.cache.get(channelId);
        if (fetchChannel) {
          try {
            await fetchChannel.delete();
          } catch (error) {
            console.log('Channel Delete Error : ' + error);
          }
        }
      }
    }
  },
};
