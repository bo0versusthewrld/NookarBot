const SlashCommand = require("../../lib/SlashCommand");
const { MessageEmbed } = require("discord.js");

const command = new SlashCommand()
	.setName("resume")
	.setDescription("Tiếp tục phát bài hát đã dừng")
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
						.setDescription("Không có bài hát nào đang phát trong hàng chờ!"),
				],
				ephemeral: true,
			});
		}
		
		if (!player.paused) {
			return interaction.reply({
				embeds: [
					new MessageEmbed()
						.setColor("RED")
						.setDescription("Bài hát hiện tại đang được phát tiếp rồi mà má xD"),
				],
				ephemeral: true,
			});
		}
		player.pause(false);
		return interaction.reply({
			embeds: [
				new MessageEmbed()
					.setColor(client.config.embedColor)
					.setDescription(`⏯ **Đang tiếp tục phát!**`),
			],
		});
	});

module.exports = command;
