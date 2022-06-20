const {SlashCommandBuilder} = require("@discordjs/builders");
const {adminsRoles, serversOptions} = require("../constants/roles");
const {IssuingRoleServices, IssuingRolesServer} = require("../services/IssuingRolesServices");
const {ErrorEmbed, RevokeEmbed} = require("../constants/embeds");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("revoke")
    .setDescription("Забрать роль администрации")
    .addUserOption((option) => {
      return option
        .setName("user")
        .setDescription("Выберите у кого забрать роль")
        .setRequired(true)
    })
    .addStringOption((option) => {
      return option
        .setName("role")
        .setDescription("Выберите роль")
        .setRequired(true)
        .addChoices(
          adminsRoles.LeadInspector,
          adminsRoles.Inspector,
          adminsRoles.JuniorInspector,
          adminsRoles.LeadAdmin,
          adminsRoles.JuniorLeadAdmin,
          adminsRoles.Admin,
          adminsRoles.Attestator
        )
    })
    .addStringOption((option) => {
      return option
        .setName("server")
        .setDescription("Выберите сервер")
        .addChoices(
          serversOptions.Jail,
          serversOptions.Bhop,
          serversOptions.MiniGames,
          serversOptions.TTT,
          serversOptions.Hitman,
          serversOptions.Maniac,
          serversOptions.Murder,
          serversOptions.SurfRPG,
          serversOptions.SurfClassic,
          serversOptions.SurfCombat,
          serversOptions.SurfSkill,
          serversOptions.DeathRun,
          serversOptions.Public,
          serversOptions.Mirage,
          serversOptions.Dust2,
          serversOptions.AWP,
          serversOptions.Arena,
          serversOptions.Knife,
          serversOptions.HungerGames
        )
    })
    .addNumberOption((option) => {
      return option
        .setName("servernumber")
        .setDescription("Выберите номер сервера")
        .setRequired(false)
    }),
  async execute(interaction) {

    const target = interaction.options.getMember("user")
    const adminRole = interaction.options.getString("role")
    const server = interaction.options.getString("server") || ''
    const serverNumber = interaction.options.getNumber("servernumber") || ''


    const baseAdminRoleService = new IssuingRoleServices(interaction.member._roles, target._roles, adminRole)

    if (baseAdminRoleService.IsEmpty(baseAdminRoleService.callerAdminRolesObj)) {
      await interaction.reply(
        {
          embeds: [ErrorEmbed('Вам недоступна эта команда', interaction)],
          ephemeral: true
        }
      )
      return false;
    }

    if (interaction.member === target) {
      await interaction.reply(
        {
          embeds: [ErrorEmbed('А хуй тебе', interaction)],
          ephemeral: true
        }
      )
      return false;
    }

    if (target.user.bot) {
      await interaction.reply(
        {
          embeds: [ErrorEmbed('Искуственный интелект не может быть в составе администрации', interaction)],
          ephemeral: true
        }
      )
      return false;
    }

    if (adminRole === adminsRoles.Attestator.value) {
      if (!baseAdminRoleService.CheckRightsForAttestator()) {
        await interaction.reply(
          {
            embeds: [ErrorEmbed('У вас недостаточно прав для удаления этой роли', interaction)],
            ephemeral: true
          }
        )
        return false;
      }
      if (!baseAdminRoleService.TargetHasRole(adminRole)) {
        await interaction.reply(
          {
            embeds: [ErrorEmbed('Этой роли нет у данного пользователя', interaction)],
            ephemeral: true
          }
        )
        return false;
      }
      await target.roles.remove(baseAdminRoleService.adminRoleObj.value);
      await interaction.reply({
        embeds: [RevokeEmbed(interaction, baseAdminRoleService.adminRoleObj.name, target)]
      })
      return true;
    }

    if (adminRole === adminsRoles.JuniorInspector.value || adminRole === adminsRoles.Inspector.value || adminRole === adminsRoles.LeadInspector.value) {
      if (!baseAdminRoleService.CheckHierarchy(baseAdminRoleService.callerAdminRolesObj.name, baseAdminRoleService.adminRoleObj.name)) {
        await interaction.reply(
          {
            embeds: [ErrorEmbed('Вы ниже по иерархии', interaction)],
            ephemeral: true
          }
        )
        return false;
      }
      if (!baseAdminRoleService.TargetHasRole(adminRole)) {
        await interaction.reply(
          {
            embeds: [ErrorEmbed('Эта роли нет у данного пользователя', interaction)],
            ephemeral: true
          }
        )
        return false;
      }
      await target.roles.remove(baseAdminRoleService.adminRoleObj.value);
      await interaction.reply({
        embeds: [RevokeEmbed(interaction, baseAdminRoleService.adminRoleObj.name, target)]
      })
      return true;
    }

    if (!server) {
      await interaction.reply(
        {
          embeds: [ErrorEmbed('Укажите сервер для удаления этой роли', interaction)],
          ephemeral: true
        }
      )
      return false;
    }

    const serverAdminRoleService = new IssuingRolesServer(interaction.member._roles, target._roles, adminRole, `${server}${serverNumber === 1 ? '' : serverNumber}`.trim())

    if (!serverAdminRoleService.IsServer()){
      await interaction.reply({
        embeds: [ErrorEmbed('Данного сервера не существует', interaction)],
        ephemeral: true
      })
      return false;
    }

    if (!serverAdminRoleService.CheckHierarchy(serverAdminRoleService.callerAdminRolesObj.name, serverAdminRoleService.adminRoleObj.name)) {
      await interaction.reply(
        {
          embeds: [ErrorEmbed('Вы ниже по иерархии', interaction)],
          ephemeral: true
        }
      )
      return false;
    }

    if (serverAdminRoleService.callerAdminRolesObj.value === adminsRoles.Developers.value || serverAdminRoleService.callerAdminRolesObj.value === adminsRoles.LeadInspector.value ||
      serverAdminRoleService.callerAdminRolesObj.value === adminsRoles.Inspector.value || serverAdminRoleService.callerAdminRolesObj.value === adminsRoles.JuniorInspector.value) {
      if (!serverAdminRoleService.TargetHasRole(serverAdminRoleService.serverRole.value)){
        await interaction.reply(
          {
            embeds: [ErrorEmbed('Пользователь не привязан к этому серверу', interaction)],
            ephemeral: true
          }
        )
        return false;
      }
      await target.roles.remove(serverAdminRoleService.serverRole.value);

      if (!serverAdminRoleService.GetServersIntersection(target._roles, serverAdminRoleService.serversArray)[0]) {
        await target.roles.remove(serverAdminRoleService.adminRoleObj.value);
        await interaction.reply({
          embeds: [RevokeEmbed(interaction, `${serverAdminRoleService.adminRoleObj.name} - ${serverAdminRoleService.serverRole.name}`, target)]
        });
        return true;
      }

      await interaction.reply({
        embeds: [RevokeEmbed(interaction, `${serverAdminRoleService.adminRoleObj.name} - ${serverAdminRoleService.serverRole.name}`, target)]
      })
      return true;
    }

    if (!serverAdminRoleService.CheckServerCompliance()) {
      await interaction.reply(
        {
          embeds: [ErrorEmbed('Вы не отвечаете за данный сервер', interaction)],
          ephemeral: true
        }
      )
      return false;
    }

    if (!serverAdminRoleService.TargetHasRole(serverAdminRoleService.serverRole.value)){
      await interaction.reply(
        {
          embeds: [ErrorEmbed('Пользователь не привязан к этому серверу', interaction)],
          ephemeral: true
        }
      )
      return false;
    }

    await target.roles.remove(serverAdminRoleService.serverRole.value);

    if (!serverAdminRoleService.GetServersIntersection(target._roles, serverAdminRoleService.serversArray)[0]) {
      await target.roles.remove(serverAdminRoleService.adminRoleObj.value);
      await interaction.reply({
        embeds: [RevokeEmbed(interaction, `${serverAdminRoleService.adminRoleObj.name} - ${serverAdminRoleService.serverRole.name}`, target)]
      });
      return true;
    }

    await interaction.reply({
      embeds: [RevokeEmbed(interaction, `${serverAdminRoleService.adminRoleObj.name} - ${serverAdminRoleService.serverRole.name}`, target)]
    })

    return true;

  },
};