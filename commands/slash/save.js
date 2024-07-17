const SlashCommand = require("../../lib/SlashCommand");
const { MessageEmbed } = require("discord.js");
const prettyMilliseconds = require("pretty-ms");

const command = new SlashCommand()
	.setName("save")
	.setDescription("Lưu lại bài hát hiện tại vào tin nhắn riêng")
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
		
		const sendtoDmEmbed = new MessageEmbed()
			.setColor(client.config.embedColor)
			.setAuthor({
				name: "Bài hát đã được lưu",
				iconURL: `${ interaction.user.displayAvatarURL({ dynamic: true }) }`,
			})
			.setDescription(
				`**Đã lưu [${ player.queue.current.title }](${ player.queue.current.uri }) to your DM**`,
			)
			.addFields(
				{
					name: "Thời lượng",
					value: `\`${ prettyMilliseconds(player.queue.current.duration, {
						colonNotation: true,
					}) }\``,
					inline: true,
				},
				{
					name: "Tác giả",
					value: `\`${ player.queue.current.author }\``,
					inline: true,
				},
				{
					name: "Lưu từ",
					value: `\`${ interaction.guild }\``,
					inline: true,
				},
			);
		
		interaction.user.send({ embeds: [sendtoDmEmbed] });
		
		return interaction.reply({
			embeds: [
				new MessageEmbed()
					.setColor(client.config.embedColor)
					.setDescription(
						"Vui lòng kiểm tra phần **tin nhắn trực tiếp (DMs)**. Nếu bạn không nhận được bất cứ tin nhắn nào từ tôi thì hãy đảm bảo rằng bạn đã bật tính năng cho phép người lạ gửi tin nhắn.",
					),
			],
			ephemeral: true,
		});
	});

module.exports = command;
