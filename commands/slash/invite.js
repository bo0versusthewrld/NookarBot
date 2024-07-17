const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const SlashCommand = require("../../lib/SlashCommand");

const command = new SlashCommand()
  .setName("invite")
  .setDescription("Xin phép quyền sử dụng bot và lấy link mời")
  .setRun(async (client, interaction, options) => {
    return interaction.reply({
      embeds: [
        new MessageEmbed()
          .setColor(client.config.embedColor)
          .setTitle(`Điền form để xin cấp phép quyền sử dụng bot và lấy link mời của bot. Chúng tôi sẽ liên hệ lại với bạn để xét duyệt trong thời gian sớm nhất.`),
      ],
      components: [
        new MessageActionRow().addComponents(
          new MessageButton()
            .setLabel("Ấn vào đây")
            .setStyle("LINK")
            .setURL(
              `https://discord.gg/v3vxnMVpRG`
            )
        ),
      ],
    });
  });
module.exports = command;
