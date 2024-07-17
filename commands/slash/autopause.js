const colors = require("colors");
const { MessageEmbed } = require("discord.js");
const SlashCommand = require("../../lib/SlashCommand");

const command = new SlashCommand()
  .setName("autopause")
  .setDescription("Tự động tạm dừng bài hát khi mọi người rời đi")
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

    let autoPauseEmbed = new MessageEmbed().setColor(client.config.embedColor);
    const autoPause = player.get("autoPause");
    player.set("requester", interaction.guild.members.me);

    if (!autoPause || autoPause === false) {
      player.set("autoPause", true);
    } else {
      player.set("autoPause", false);
    }
    autoPauseEmbed
			.setDescription(`**Tự động Tạm dừng bài hát đang** \`${!autoPause ? "BẬT" : "TẮT"}\``)
			.setFooter({
			  text: `Bot bây giờ sẽ ${!autoPause ? "tự động" : "không tự động"} tạm dừng bài hát khi mọi người rời đi.`
			});
    client.warn(
      `User: ${player.options.guild} | [${colors.blue(
        "AUTOPAUSE"
      )}] đã được [${colors.blue(!autoPause ? "BẬT" : "TẮT")}] trong ${
        client.guilds.cache.get(player.options.guild)
          ? client.guilds.cache.get(player.options.guild).name
          : "guild"
      }`
    );

    return interaction.reply({ embeds: [autoPauseEmbed] });
  });

module.exports = command;
