const SlashCommand = require("../../lib/SlashCommand");
const { MessageEmbed } = require("discord.js");

const command = new SlashCommand()
	.setName("loop")
	.setDescription("Lặp lại bài hát hiện tại")
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
		
		if (player.setTrackRepeat(!player.trackRepeat)) {
			;
		}
		const trackRepeat = player.trackRepeat? "BẬT" : "TẮT";
		
		interaction.reply({
			embeds: [
				new MessageEmbed()
					.setColor(client.config.embedColor)
					.setDescription(`👍 | **Lặp lại bài hát đã được\`${ trackRepeat }\`**`),
			],
		});
	});

module.exports = command;
