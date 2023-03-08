const { Events } = require('discord.js');
const parentId = process.env.RANDOM_ROOM_PARENT_ID;
const waitingRoomId = process.env.WAITING_ROOM_ID;

module.exports = {
  name: Events.VoiceStateUpdate,
  once: false,
  /**
   *
   * @param {import("discord.js").VoiceState} oldState
   * @param {import("discord.js").VoiceState} newState
   */
  async execute(oldState) {
    if (oldState.channel?.parent?.id === parentId && oldState.channel?.id !== waitingRoomId) {
      /** 이탈한 채널의 멤버가 혼자이고 채널이 존재한다면 */
      if (oldState.channel?.members.size === 1) {
        const channel = await oldState.guild.channels.cache.get(oldState.channel?.id);
        if (channel) {
          try {
            await channel.delete();
          } catch (error) {
            console.log('throw Error : ' + error);
          }
        }
      }
    }
  },
};
