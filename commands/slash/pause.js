const SlashCommand = require("../../lib/SlashCommand");
const { MessageEmbed } = require("discord.js");

const command = new SlashCommand()
	.setName("pause")
	.setDescription("Tạm dừng bài hát hiện tại")
	.setRun(async (client, interaction, options) => {
		let channel = await client.getChannel(client, interaction);
		if (!channel) {
			return;
		}
		
		let player;
		if (client.manager) {
			player = client.manager.players.get(interaction.guild.id);
		} else {
			return interaction.reply({
				embeds: [
					new MessageEmbed()
						.setColor("RED")
						.setDescription("Chưa kết nối với server Lavalink!"),
				],
			});
		}
		
		if (!player) {
			return interaction.reply({
				embeds: [
					new MessageEmbed()
						.setColor("RED")
						.setDescription("Làm đếch có gì đang phát :/"),
				],
				ephemeral: true,
			});
		}
		
		if (player.paused) {
			return interaction.reply({
				embeds: [
					new MessageEmbed()
						.setColor("RED")
						.setDescription("Bài hát hiện tại đã được dừng từ trước rồi :D"),
				],
				ephemeral: true,
			});
		}
		
		player.pause(true);
		return interaction.reply({
			embeds: [
				new MessageEmbed()
					.setColor(client.config.embedColor)
					.setDescription(`⏸ | **Đã tạm dừng bài hát!**`),
			],
		});
	});

module.exports = command;
