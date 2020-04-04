const uuidv4 = require("uuid").v4;

const random = range => {
  return Math.floor(Math.random() * range);
};

const randomYMD = () => {
  const month = random(12) + 1;
  const day = random(28) + 1;
  const year = "2020";

  return (
    year + (month < 10 ? "0" + month : month) + (day < 10 ? "0" + day : day)
  );
};

module.exports = () => {
  const names = ["郭云峰", "陆志强", "邱仁博"];
  const addrs = ["总馆", "秀洲分馆", "南湖分馆"];
  const actions = ["维护", "巡检", "部署"];
  const devices = ["自助借还机", "网络"];
  const types = ["软件", "硬件"];

  const createMaintenanceList = number => {
    let maintenances = [];
    for (let i = 0; i < number; i++) {
      maintenance = {};
      maintenance.id = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
      maintenance.date = randomYMD();
      maintenance.addr = addrs[random(addrs.length)];
      maintenance.name = names[random(names.length)];
      maintenance.action = actions[random(actions.length)];
      maintenance.device = devices[random(devices.length)];
      maintenance.type = types[random(types.length)];

      maintenances.push(maintenance);
    }
    return maintenances;
  };

  const data = {
    maintenances: { total: 30, list: createMaintenanceList(30) },
    maintenanceNames: names,
    maintenanceActions: actions,
    maintenanceDevices: devices,
    maintenanceAddrs: addrs,
    maintenanceTypes: types
  };

  return data;
};
