const { MessageEmbed } = require("discord.js")

const ErrorEmbed = (text, interaction) => {
  return new MessageEmbed()
    .setColor("#FF0000")
    .setTitle(" :octagonal_sign: Произошла ошибка")
    .addField(
      `${text}`,
      `\u200B`
    )
    .setFooter({
      text: `Запросил ${interaction.user.username}`,
      iconURL: interaction.user.avatarURL(),
    });
}

const SuccessEmbed = (text, interaction) => {
  return new MessageEmbed()
    .setColor("#7CFC00")
    .addField(
      `${text}`,
      `\u200B`
    )
    .setFooter({
      text: `Запросил ${interaction.user.username}`,
      iconURL: interaction.user.avatarURL(),
    })
    .setTimestamp();
}

const GrantEmbed = (interaction, adminRole, target) => {
  return new MessageEmbed()
    .setColor("#0099ff")
    .setTitle(
      `Роль администратора успешно выдана!`
    )
    .addField(
      "\u200B",
      `${interaction.user} (${interaction.user.username}) выдал роль ${adminRole} <@${target.id}> (${target.user.username})`
    )
    .setFooter({
      text: `Запросил ${interaction.user.username}`,
      iconURL: interaction.user.avatarURL(),
    });
}

const RevokeEmbed = (interaction, adminRole, target) => {
  return new MessageEmbed()
    .setColor("#0099ff")
    .setTitle(
      `Роль администратора успешно удалена!`
    )
    .addField(
      "\u200B",
      `${interaction.user} (${interaction.user.username}) забраль роль ${adminRole} у <@${target.id}> (${target.username})`
    )
    .setFooter({
      text: `Запросил ${interaction.user.username}`,
      iconURL: interaction.user.avatarURL(),
    });
}

module.exports = {
  ErrorEmbed,
  SuccessEmbed,
  GrantEmbed,
  RevokeEmbed
}