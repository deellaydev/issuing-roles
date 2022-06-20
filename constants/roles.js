const adminsRoles = {
  Developers: {
    name: 'Developers',
    value: '279449980933111808'
  },
  LeadInspector: {
    name: 'LeadInspector',
    value: '750692347586674758'
  },
  Inspector: {
    name: 'Inspector',
    value: '270186921047621642'
  },
  JuniorInspector: {
    name: 'JuniorInspector',
    value: '951532817135849532'
  },
  LeadAdmin: {
    name: 'LeadAdmin',
    value: '286115288699895808'
  },
  JuniorLeadAdmin: {
    name: 'JuniorLeadAdmin',
    value: '760186547160350772'
  },
  Admin: {
    name: 'Admin',
    value: '430013232833363969'
  },
  Attestator: {
    name: 'Attestator',
    value: '376495291362181121'
  }
}

const serversOptions = {
  Jail: {
    name: 'Jail',
    value: 'Jail'
  },
  Bhop: {
    name: 'Bhop',
    value: 'Bhop'
  },
  MiniGames: {
    name: 'MiniGames',
    value: 'MiniGames'
  },
  TTT: {
    name: 'TTT',
    value: 'TTT'
  },
  Hitman: {
    name: 'Hitman',
    value: 'Hitman',
  },
  Maniac: {
    name: 'Maniac',
    value: 'Maniac',
  },
  Murder: {
    name: 'Murder',
    value: 'Murder'
  },
  SurfRPG: {
    name: 'SurfRPG',
    value: 'SurfRPG'
  },
  SurfClassic: {
    name: 'SurfClassic',
    value: 'SurfClassic'
  },
  SurfCombat: {
    name: 'SurfCombat',
    value: 'SurfCombat'
  },
  SurfSkill: {
    name: 'SurfSkill',
    value: 'SurfSkill'
  },
  DeathRun: {
    name: 'DeathRun',
    value: 'DeathRun'
  },
  Public: {
    name: 'Public',
    value: 'Public'
  },
  Mirage: {
    name: 'Mirage',
    value: 'Mirage'
  },
  Dust2: {
    name: 'Dust2',
    value: 'Dust2'
  },
  AWP: {
    name: 'AWP',
    value: 'AWP',
  },
  Arena: {
    name: 'Arena',
    value: 'Arena'
  },
  Knife: {
    name: 'Knife',
    value: 'Knife'
  },
  HungerGames: {
    name: 'HungerGames',
    value: 'HungerGames'
  },
}

const serversRoles = {
  Jail: {
    name: 'Jail',
    value: '709063226725236778'
  },
  Jail2: {
    name: 'Jail2',
    value: '774647701550923777'
  },
  Bhop: {
    name: 'Bhop',
    value: '709063708516679821'
  },
  Bhop2: {
    name: 'Bhop2',
    value: '747732311134699611'
  },
  Bhop3: {
    name: 'Bhop3',
    value: '954110812698583070'
  },
  MiniGames: {
    name: 'MiniGames',
    value: '709063320967184474'
  },
  MiniGames2: {
    name: 'MiniGames2',
    value: '747731175556120627'
  },
  MiniGames3: {
    name: 'MiniGames3',
    value: '837583413208416277'
  },
  MiniGames4: {
    name: 'MiniGames4',
    value: '960994512874901554'
  },
  TTT: {
    name: 'TTT',
    value: '709063416320622694'
  },
  Hitman: {
    name: 'Hitman',
    value: '709063794680266814',
  },
  Maniac: {
    name: 'Maniac',
    value: '709063485149151373',
  },
  Maniac2: {
    name: 'Maniac2',
    value: '747732421340037140',
  },
  Maniac3: {
    name: 'Maniac3',
    value: '796397699100180886',
  },
  Maniac4: {
    name: 'Maniac4',
    value: '838456613793824772',
  },
  Maniac5: {
    name: 'Maniac5',
    value: '897903775837200426',
  },
  Maniac6: {
    name: 'Maniac6',
    value: '960994614167355392',
  },
  Maniac7: {
    name: 'Maniac7',
    value: '960994216530575360',
  },
  Murder: {
    name: 'Murder',
    value: '764886924447186964'
  },
  SurfRPG: {
    name: 'SurfRPG',
    value: '709063975727530046'
  },
  SurfClassic: {
    name: 'SurfClassic',
    value: '709063884002295918'
  },
  SurfCombat: {
    name: 'SurfCombat',
    value: '747731672853905418'
  },
  SurfSkill: {
    name: 'SurfSkill',
    value: '838456422265913444'
  },
  DeathRun: {
    name: 'DeathRun',
    value: '709064068497145937'
  },
  Public: {
    name: 'Public',
    value: '709131737812303914'
  },
  Public2: {
    name: 'Public2',
    value: '838457121846460479'
  },
  Mirage: {
    name: 'Mirage',
    value: '709131803226538084'
  },
  Dust2: {
    name: 'Dust2',
    value: '897903520597041203'
  },
  AWP: {
    name: 'AWP',
    value: '709063620692148244',
  },
  Arena: {
    name: 'Arena',
    value: '838456825514819635'
  },
  Arena2: {
    name: 'Arena2',
    value: '838457294484013107'
  },
  Knife: {
    name: 'Knife',
    value: '796397503746277386'
  },
  HungerGames: {
    name: 'HungerGames',
    value: '836939633568514118'
  }
}

const hierarchy = {
  Developers: {
    name: 'Developers',
    value: '279449980933111808',
    childRoles: ['LeadInspector', 'Inspector', 'JuniorInspector', 'LeadAdmin', 'JuniorLeadAdmin', 'Admin']
  },
  LeadInspector: {
    name: adminsRoles.LeadInspector.name,
    value: adminsRoles.LeadInspector.value,
    childRoles: ['Inspector', 'JuniorInspector', 'LeadAdmin', 'JuniorLeadAdmin', 'Admin']
  },
  Inspector: {
    name: adminsRoles.Inspector.name,
    value: adminsRoles.Inspector.value,
    childRoles: ['JuniorInspector', 'LeadAdmin', 'JuniorLeadAdmin', 'Admin']
  },
  JuniorInspector: {
    name: adminsRoles.JuniorInspector.name,
    value: adminsRoles.JuniorInspector.value,
    childRoles: ['LeadAdmin', 'JuniorLeadAdmin', 'Admin']
  },
  LeadAdmin: {
    name: adminsRoles.LeadAdmin.name,
    value: adminsRoles.LeadAdmin.value,
    childRoles: ['Admin']
  },
  JuniorLeadAdmin: {
    name: adminsRoles.JuniorLeadAdmin.name,
    value: adminsRoles.JuniorLeadAdmin.value,
    childRoles: ['Admin']
  },
  Admin: {
    name: adminsRoles.Admin.name,
    value: adminsRoles.Admin.value,
    childRoles: ['']
  }
}

const separators = {
  GameServerRank: {
    name: 'GameServerRank',
    value: '835862160914907146'
  },
  ServerStaff: {
    name: 'ServerStaff',
    value: '678264779839897600'
  }
}

module.exports = {
  adminsRoles,
  hierarchy,
  serversRoles,
  serversOptions,
  separators
}