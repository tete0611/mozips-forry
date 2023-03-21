// const { Events } = require('discord.js');
// const {
//   createAudioResource,
//   joinVoiceChannel,
//   AudioPlayerStatus,
//   createAudioPlayer,
//   NoSubscriberBehavior,
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
//     // const receiver = connection.receiver.;
//     const audioPlayer = createAudioPlayer({
//       behaviors: { noSubscriber: NoSubscriberBehavior.Pause },
//     });
//     connection.subscribe(audioPlayer);

//     const fileName = `recording-${Date.now()}.pcm`;
//     const writeStream = fs.createWriteStream(fileName);
//     // const audioStream = receiver.createStream(message.member, { mode: 'pcm' });
//     // audioStream.pipe(writeStream);
//     audioPlayer.on(AudioPlayerStatus.Playing, () => {
//       console.log('뭔가실행됨');
//     });
//     audioPlayer.on(AudioPlayerStatus.Idle, () => {
//       console.log('녹음끗');
//       writeStream.end();
//       connection.destroy();
//     });
//   },
// };
