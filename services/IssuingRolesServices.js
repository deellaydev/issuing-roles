const {adminsRoles, serversRoles, hierarchy} = require("../constants/roles");

class IssuingRoleServices {

  constructor(callerRoles, targetRoles, adminRole) {
    this.callerRoles = callerRoles;
    this.targetRoles = targetRoles;
    this.adminRoleObj = this.GetAdminRoleID(adminRole);
    this.adminsRolesArray = this.InitialArrays(adminsRoles);
    this.callerAdminRolesObj = this.GetUserAdminRole(callerRoles);
    this.targetAdminRolesObj = this.GetUserAdminRole(targetRoles);
  }

  InitialArrays(iterArray) {
    let array = [];
    for (let key in iterArray) {
      array.push(iterArray[key].value)
    }
    return array;
  }

  VerificationServer(serverRoleName) {
    for (let key in serversRoles) {
      if (serversRoles[key].name === serverRoleName) {
        return true;
      }
    }
    return false;
  }

  GetServerRoleID(serverName) {
    for (let key in serversRoles) {
      if (serversRoles[key].name === serverName) {
        return serversRoles[key];
      }
    }
  }

  GetAdminRoleID(adminRole) {
    for (let key in adminsRoles) {
      if (adminsRoles[key].value === adminRole) {
        return adminsRoles[key]
      }
    }
  }

  GetRolesIntersection(arrA, arrB) {
    return arrA.filter(x => arrB.includes(x) && x !== adminsRoles.Attestator.value)[0];
  }

  CheckHierarchy(parentRole, childRole) {
    return hierarchy[parentRole].childRoles.includes(childRole)
  }

  GetRoleObj(variable, obj, target) {
    for (let key in obj) {
      if (obj[key][target] === variable) {
        return obj[key]
      }
    }
  }

  CheckRightsForAttestator() {
    return this.adminsRolesArray.filter((role) => role !== adminsRoles.Admin.value && role !== adminsRoles.LeadAdmin.value && role !== adminsRoles.JuniorLeadAdmin.value && role !== adminsRoles.Attestator.value)
      .includes(this.callerAdminRolesObj?.value)
  }

  NeedAttestator() {
    return (this.targetAdminRolesObj.value === adminsRoles.LeadAdmin.value || this.targetAdminRolesObj.value === adminsRoles.JuniorLeadAdmin.value)
  }

  GetUserAdminRole(roles) {
    const roleID = this.GetRolesIntersection(roles, this.adminsRolesArray)
    return this.GetRoleObj(roleID, adminsRoles, 'value')
  }

  TargetHasRole(role) {
    return this.targetRoles.includes(role)
  }

  IsEmpty(obj) {
    for (let key in obj) {
      return false;
    }
    return true;
  }

}

class IssuingRolesServer extends IssuingRoleServices {

  constructor(callerRoles, targetRoles, adminRole, serverRole) {
    super(callerRoles, targetRoles, adminRole)
    this.serverRole = this.GetServerRoleID(serverRole);
    this.serversArray = this.InitialArrays(serversRoles);
    this.callerServersRoles = this.GetServersIntersection(callerRoles, this.serversArray)
  }

  CheckServerCompliance() {
    return this.callerServersRoles.includes(this.serverRole.value)
  }

  GetServersIntersection(arrA, arrB) {
    return arrA.filter(x => arrB.includes(x) && x !== adminsRoles.Attestator.value);
  }


}

module.exports = {
  IssuingRoleServices,
  IssuingRolesServer
}