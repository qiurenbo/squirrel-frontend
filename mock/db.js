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
const createMaintainanceList = number => {
  const names = ["郭云峰", "陆志强", "邱仁博"];
  const addrs = ["总馆", "秀洲分馆", "南湖分馆"];
  const actions = ["维护", "巡检"];
  const devices = ["自助借还机", "网络"];
  const types = ["软件", "硬件"];
  let maintainances = [];
  for (let i = 0; i < number; i++) {
    maintainance = {};
    maintainance.id = i + 1;
    maintainance.date = randomYMD();
    maintainance.addr = addrs[random(addrs.length)];
    maintainance.name = names[random(names.length)];
    maintainance.action = actions[random(actions.length)];
    maintainance.device = devices[random(devices.length)];
    maintainance.type = types[random(types.length)];

    maintainances.push(maintainance);
  }
  return maintainances;
};

module.exports = () => {
  const data = { maintainances: createMaintainanceList(30) };

  return data;
};
