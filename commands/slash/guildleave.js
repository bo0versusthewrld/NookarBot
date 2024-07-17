const { MessageEmbed, message } = require("discord.js");
const SlashCommand = require("../../lib/SlashCommand");
const fs = require("fs");
const path = require("path");
const { forEach } = require("lodash");

const command = new SlashCommand()
	.setName("guildleave")
	.setDescription("Rời guild (Chỉ dành cho Admin)")
    .addStringOption((option) =>
    option
      .setName("id")
      .setDescription("Nhập guild id để rời (`list` để xem guild ids)")
      .setRequired(true)
  )
  .setRun(async (client, interaction, options) => {
		if (interaction.user.id === client.config.adminId) {
		    try{
			const id = interaction.options.getString('id');

			if (id.toLowerCase() === 'list'){
			    client.guilds.cache.forEach((guild) => {
				console.log(`${guild.name} | ${guild.id}`);
			    });
			    const guild = client.guilds.cache.map(guild => ` ${guild.name} | ${guild.id}`);
			    try{
				return interaction.reply({content:`Guilds:\n\`${guild}\``, ephemeral: true});
			    }catch{
				return interaction.reply({content:`Kiểm tra console`, ephemeral: true});
			    }
			}

			const guild = client.guilds.cache.get(id);

			if(!guild){
			    return interaction.reply({content: `\`${id}\` không đúng với id của guild nào cả`, ephemeral:true});
			}

			await guild.leave().then(c => console.log(`đã rời guild ${id}`)).catch((err) => {console.log(err)});
			return interaction.reply({content:`đã rời guild\`${id}\``, ephemeral: true});
		    }catch (error){
			console.log(`xảy ra lỗi khi rời guild ${id}`, error);
		    }
		}else {
			return interaction.reply({
				embeds: [
					new MessageEmbed()
						.setColor(client.config.embedColor)
						.setDescription("Bạn không đủ thẩm quyền để yêu cầu tôi làm việc này!"),
				],
				ephemeral: true,
			});
		}
	});

module.exports = command;
