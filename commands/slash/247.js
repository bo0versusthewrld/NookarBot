const colors = require("colors");
const { MessageEmbed } = require("discord.js");
const SlashCommand = require("../../lib/SlashCommand");

const command = new SlashCommand()
	.setName("247")
	.setDescription("Không cho phép bot rời khỏi kênh")
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
		
		let twentyFourSevenEmbed = new MessageEmbed().setColor(
			client.config.embedColor,
		);
		const twentyFourSeven = player.get("twentyFourSeven");
		
		if (!twentyFourSeven || twentyFourSeven === false) {
			player.set("twentyFourSeven", true);
		} else {
			player.set("twentyFourSeven", false);
		}
		twentyFourSevenEmbed
		  .setDescription(`**Chế độ 24/7 đang** \`${!twentyFourSeven ? "BẬT" : "TẮT"}\``)
		  .setFooter({
		    text: `Bot sẽ ${!twentyFourSeven ? "tiếp tục" : "không"} kết nối và ở lại kênh 24/7.`
      });
		client.warn(
			`User: ${ player.options.guild } | [${ colors.blue(
				"24/7",
			) }] đã được [${ colors.blue(
				!twentyFourSeven? "BẬT" : "TẮT",
			) }] trong ${
				client.guilds.cache.get(player.options.guild)
					? client.guilds.cache.get(player.options.guild).name
					: "guild"
			}`,
		);
		
		if (!player.playing && player.queue.totalSize === 0 && twentyFourSeven) {
			player.destroy();
		}
		
		return interaction.reply({ embeds: [twentyFourSevenEmbed] });
	});

module.exports = command;
// check above message, it is a little bit confusing. and erros are not handled. probably should be fixed.
// ok use catch ez kom  follow meh ;_;
// the above message meaning error, if it cant find it or take too long the bot crashed
// play commanddddd, if timeout or takes 1000 years to find song it crashed
// OKIE, leave the comment here for idk
// Comment very useful, 247 good :+1:
// twentyFourSeven = best;
