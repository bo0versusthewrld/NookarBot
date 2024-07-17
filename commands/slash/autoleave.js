const colors = require("colors");
const { MessageEmbed } = require("discord.js");
const SlashCommand = require("../../lib/SlashCommand");

const command = new SlashCommand()
  .setName("autoleave")
  .setDescription("Tự động ngắt kết nối khi cảm thấy cô đơn")
  .setRun(async (client, interaction) => {
    let channel = await client.getChannel(client, interaction);
    if (!channel) return;

    let player;
    if (client.manager)
      player = client.manager.players.get(interaction.guild.id);
    else
      return interaction.reply({
        embeds: [
          new MessageEmbed()
            .setColor("RED")
            .setDescription("Chưa kết nối với server Lavalink!"),
        ],
      });

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

    let autoLeaveEmbed = new MessageEmbed().setColor(client.config.embedColor);
    const autoLeave = player.get("autoLeave");
    player.set("requester", interaction.guild.me);

    if (!autoLeave || autoLeave === false) {
      player.set("autoLeave", true);
    } else {
      player.set("autoLeave", false);
    }
    autoLeaveEmbed
			.setDescription(`**Tự động ngắt kết nối đang** \`${!autoLeave ? "BẬT" : "TẮT"}\``)
			.setFooter({
			  text: `Bot sẽ ${!autoLeave ? "tự động" : "không tự động"} ngắt kết nối khi cảm thấy cô đơn.`
			});
    client.warn(
      `User: ${player.options.guild} | [${colors.blue(
        "autoLeave"
      )}] đã được [${colors.blue(!autoLeave ? "BẬT" : "TẮT")}] trong ${
        client.guilds.cache.get(player.options.guild)
          ? client.guilds.cache.get(player.options.guild).name
          : "guild"
      }`
    );

    return interaction.reply({ embeds: [autoLeaveEmbed] });
  });

module.exports = command;