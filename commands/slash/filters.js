const { MessageEmbed } = require("discord.js");
const SlashCommand = require("../../lib/SlashCommand");

const command = new SlashCommand()
	.setName("eq")
	.setDescription("thêm hoặc xoá bộ lọc âm")
	.addStringOption((option) =>
		option
			.setName("filters")
			.setDescription("chọn kiểu âm thanh mà bạn muốn sử dụng")
			.setRequired(true)
			.addChoices(
				{ name: "Nightcore", value: "nightcore" },
				{ name: "Bassboost", value: "bassboost" },
				{ name: "Vaporwave", value: "vaporwave" },
				{ name: "Pop", value: "pop" },
				{ name: "Soft", value: "soft" },
				{ name: "Treblebass", value: "treblebass" },
				{ name: "Eight Dimension", value: "eightD" },
				{ name: "Karaoke", value: "karaoke" },
				{ name: "Vibrato", value: "vibrato" },
				{ name: "Tremolo", value: "tremolo" },
				{ name: "Tắt", value: "off" },
			),
	)
	
	.setRun(async (client, interaction, options) => {
		const args = interaction.options.getString("filters");
		
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
						.setDescription("Không có bài hát nào đang được phát."),
				],
				ephemeral: true,
			});
		}
		
		// create a new embed
		let filtersEmbed = new MessageEmbed().setColor(client.config.embedColor);
		
		if (args == "nightcore") {
			filtersEmbed.setDescription("✅ | Đã kích hoạt chế độ nhạc Nightcore!");
			player.nightcore = true;
		} else if (args == "bassboost") {
			filtersEmbed.setDescription("✅ | Đã kích hoạt chế độ nhạc Bassboost!");
			player.bassboost = true;
		} else if (args == "vaporwave") {
			filtersEmbed.setDescription("✅ | Đã kích hoạt chế độ nhạc Vaporwave!");
			player.vaporwave = true;
		} else if (args == "pop") {
			filtersEmbed.setDescription("✅ | Đã kích hoạt chế độ nhạc Pop!");
			player.pop = true;
		} else if (args == "soft") {
			filtersEmbed.setDescription("✅ | Đã kích hoạt chế độ nhạc Soft!");
			player.soft = true;
		} else if (args == "treblebass") {
			filtersEmbed.setDescription("✅ | Đã kích hoạt chế độ nhạc Treblebass!");
			player.treblebass = true;
		} else if (args == "eightD") {
			filtersEmbed.setDescription("✅ | Đã kích hoạt chế độ Eight Dimension!");
			player.eightD = true;
		} else if (args == "karaoke") {
			filtersEmbed.setDescription("✅ | Đã kích hoạt chế độ nhạc Karaoke!");
			player.karaoke = true;
		} else if (args == "vibrato") {
			filtersEmbed.setDescription("✅ | Đã kích hoạt chế độ Vibrato!");
			player.vibrato = true;
		} else if (args == "tremolo") {
			filtersEmbed.setDescription("✅ | Đã kích hoạt chế độ Tremolo!");
			player.tremolo = true;
		} else if (args == "off") {
			filtersEmbed.setDescription("✅ | EQ has been cleared!");
			player.reset();
		} else {
			filtersEmbed.setDescription("❌ | Xin hãy chọn giá đúng!");
		}
		
		return interaction.reply({ embeds: [filtersEmbed] });
	});

module.exports = command;
