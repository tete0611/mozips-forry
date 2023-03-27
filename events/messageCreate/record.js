// const { Events } = require('discord.js');
// const {
//   createAudioResource,
//   joinVoiceChannel,
//   AudioPlayerStatus,
//   createAudioPlayer,
// } = require('@discordjs/voice');
// const fs = require('fs');

// module.exports = {
//   name: Events.MessageCreate,
//   once: false,
//   /**
//    *
//    * @param {import('discord.js').Message} message
//    */
//   async execute(message) {
//     if (message.content !== '!녹음시작') return;
//     const { channelId, guildId, guild } = message;
//     /** 봇 참가시키기 */
//     const connection = await joinVoiceChannel({
//       channelId: channelId,
//       guildId: guildId,
//       adapterCreator: guild.voiceAdapterCreator,
//     });
//     const fileName = `recording-${Date.now()}.pcm`;
//     const writeStream = fs.createWriteStream(fileName);
//     const receiver = connection.receiver;
//     const audioPlayer = createAudioPlayer();
//     // const audioResource = createAudioResource({
//     //   input: './record.pcm',
//     //   metadata: { channelId: message.member.voice.channelId },
//     // });
//     // audioPlayer.play(audioResource);

//     audioPlayer.on(AudioPlayerStatus.Idle, () => {
//       console.log('녹음끗');
//       writeStream.end();
//       connection.destroy();
//     });
//   },
// };
