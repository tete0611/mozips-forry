const { Events } = require('discord.js');

module.exports = {
  name: Events.VoiceStateUpdate,
  once: false,
  /**
   *
   * @param {import("discord.js").VoiceState} oldState
   * @param {import("discord.js").VoiceState} newState
   */
  async execute(oldState, newState) {
    if (oldState.channel?.parent?.name === '랜덤채널') {
      /** 이탈한 채널의 멤버가 혼자이면 채널 삭제*/
      if (oldState.channel.members.map(v => v).length === 1) await oldState.channel.delete();
    }
  },
};
