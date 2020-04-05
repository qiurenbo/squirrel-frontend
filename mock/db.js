const uuidv4 = require("uuid").v4;

const random = (range) => {
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
  const addrs = [
    {
      id: uuidv4(),
      name: "总馆外借",
      addr: "海盐塘路339号",
      tel: "82535009",
      type: "部门",
    },
    {
      id: uuidv4(),
      name: "秀洲分馆",
      addr: "中山西路887号",
      tel: "82535008",
      type: "分馆",
    },

    {
      id: uuidv4(),
      name: "普光村",
      addr: "海盐塘路339号",
      tel: "82555108",
      type: "村流通",
    },
  ];
  const actions = ["软件配置", "硬件更换", "软件升级", "报废处理", "硬件重启"];
  const targets = [
    {
      id: uuidv4(),
      name: "自助借还机软件",
      type: "软件",
      brand: "阿尔法迪",
    },
    {
      id: uuidv4(),
      name: "路由器",
      type: "硬件",
      brand: "TPLink",
    },
    {
      id: uuidv4(),
      name: "自助借还机硬件",
      type: "硬件",
      brand: "阿尔法迪",
    },
  ];
  const types = ["无法开机", "无法联网", "无法登陆"];

  const createMaintenanceList = (number) => {
    let maintenances = [];
    for (let i = 0; i < number; i++) {
      maintenance = {};
      maintenance.id = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
      maintenance.date = randomYMD();
      maintenance.addr = addrs[random(addrs.length)];
      maintenance.name = names[random(names.length)];
      maintenance.action = actions[random(actions.length)];
      maintenance.target = targets[random(targets.length)];
      maintenance.type = types[random(types.length)];

      maintenances.push(maintenance);
    }
    return maintenances;
  };

  const data = {
    maintenances: { total: 30, list: createMaintenanceList(30) },
    maintenanceNames: names,
    maintenanceActions: actions,
    maintenanceTargets: targets,
    maintenanceAddrs: addrs,
    maintenanceTypes: types,
  };

  return data;
};
