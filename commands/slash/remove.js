const SlashCommand = require("../../lib/SlashCommand");
const { MessageEmbed } = require("discord.js");

const command = new SlashCommand()
	.setName("remove")
	.setDescription("Xoá bài hát đã có ở trong Hàng chờ mà bạn không muốn nghe")
	.addNumberOption((option) =>
		option
			.setName("number")
			.setDescription("Hãy nhập số thứ tự của bài hát mà bạn muốn xoá.")
			.setRequired(true),
	)
	
	.setRun(async (client, interaction) => {
		const args = interaction.options.getNumber("number");
		
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
						.setDescription("Làm gì có bài hát nào để tôi xoá ?-?"),
				],
				ephemeral: true,
			});
		}
		
		await interaction.deferReply();
		
		const position = Number(args) - 1;
		if (position > player.queue.size) {
			let thing = new MessageEmbed()
				.setColor(client.config.embedColor)
				.setDescription(
					`Hàng chờ hiện tại chỉ có **${ player.queue.size }** bài`,
				);
			return interaction.editReply({ embeds: [thing] });
		}
		
		const song = player.queue[position];
		player.queue.remove(position);
		
		const number = position + 1;
		let removeEmbed = new MessageEmbed()
			.setColor(client.config.embedColor)
			.setDescription(`Đã loại bỏ bài hát số **${ number }** ra khỏi hàng chờ`);
		return interaction.editReply({ embeds: [removeEmbed] });
	});

module.exports = command;
