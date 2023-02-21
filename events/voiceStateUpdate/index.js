const { Events } = require('discord.js');

module.exports = {
  name: Events.VoiceStateUpdate,
  once: false,
  /**
   *
   * @param {import("discord.js").VoiceState} oldState
   * @param {import("discord.js").VoiceState} newState
   */
  async execute(oldState, _) {
    const parentId = process.env.RANDOM_ROOM_PARENT_ID;
    const waitingRoomId = process.env.WAITING_ROOM_ID;
    if (oldState.channel?.parent?.id === parentId && oldState.channel?.id !== waitingRoomId) {
      /** 이탈한 채널의 멤버가 혼자이면 채널 삭제*/
      if (oldState.channel?.members.map(v => v).length <= 1)
        try {
          await oldState.channel.delete();
        } catch (error) {
          console.log('throw Error : ' + error);
        }
    }
  },
};
