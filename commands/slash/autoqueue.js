const colors = require("colors");
const { MessageEmbed } = require("discord.js");
const SlashCommand = require("../../lib/SlashCommand");

const command = new SlashCommand()
	.setName("autoqueue")
	.setDescription("Tự động thêm bài hát khác vào Hàng chờ")
	.setRun(async (client, interaction) => {
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
		
		let autoQueueEmbed = new MessageEmbed().setColor(client.config.embedColor);
		const autoQueue = player.get("autoQueue");
		player.set("requester", interaction.guild.members.me);
		
		if (!autoQueue || autoQueue === false) {
			player.set("autoQueue", true);
		} else {
			player.set("autoQueue", false);
		}
		autoQueueEmbed
		  .setDescription(`**Tự động thêm bài hát khác vào Hàng chờ đang** \`${!autoQueue ? "BẬT" : "TẮT"}\``)
		  .setFooter({
		    text: `Những bài hát (có vẻ hoặc không) liên quan bây giờ sẽ ${!autoQueue ? "tự động được" : "không tự động"} thêm vào Hàng chờ.`
      });
		client.warn(
			`User: ${ player.options.guild } | [${ colors.blue(
				"AUTOQUEUE",
			) }] đã được [${ colors.blue(!autoQueue? "BẬT" : "TẮT") }] trong ${
				client.guilds.cache.get(player.options.guild)
					? client.guilds.cache.get(player.options.guild).name
					: "guild"
			}`,
		);
		
		return interaction.reply({ embeds: [autoQueueEmbed] });
	});

module.exports = command;
