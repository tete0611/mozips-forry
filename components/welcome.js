const { EmbedBuilder } = require('discord.js');

const welcomeEmbed = new EmbedBuilder().setDescription(
  `**Hello! New villager!👋🏻\nWelcome to mozips village!🏡\nMozips Village is a place where you can learn and practice Korean together.\nShall we greet our Mozips Villagers?💬**\n1️⃣ Please let us know your name (nickname).\n2️⃣ How long have you been learning Korean?\n3️⃣ Which country are you from?\n4️⃣ Say a word to our villagers`,
);

module.exports = {
  welcomeEmbed: welcomeEmbed,
};
