const { EmbedBuilder } = require('discord.js');

const totalEmbed = new EmbedBuilder({
  fields: [
    { name: '\u200B', value: '\u200B' },
    { name: `1등:first_place:`, value: '-', inline: true },
    { name: `2등:second_place:`, value: '    -    ', inline: true },
    { name: `3등:third_place:`, value: '    -    ', inline: true },
    { name: `4등`, value: '    -    ', inline: true },
    { name: `5등`, value: '    -    ', inline: true },
    { name: `6등`, value: '    -    ', inline: true },
  ],
});
const successionEmbed = new EmbedBuilder({
  fields: [
    { name: '\u200B', value: '\u200B' },
    { name: `1등:first_place:`, value: '-', inline: true },
    { name: `2등:second_place:`, value: '    -    ', inline: true },
    { name: `3등:third_place:`, value: '    -    ', inline: true },
    { name: `4등`, value: '    -    ', inline: true },
    { name: `5등`, value: '    -    ', inline: true },
    { name: `6등`, value: '    -    ', inline: true },
  ],
});

module.exports = {
  totalEmbed: totalEmbed,
  successionEmbed: successionEmbed,
};
