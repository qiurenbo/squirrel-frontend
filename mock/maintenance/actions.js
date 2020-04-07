const malfunctions = require("./malfunctions");
const { random } = require("../utils");
const uuidv4 = require("uuid").v4;

const createActions = () => {
  const arrs = [
    ["软件配置", "硬件更换", "软件升级", "报废处理", "硬件重启"],
    ["报废处理", "硬件重启"],
    ["软件升级", "报废处理"],
  ];

  let actions = [];

  for (let i = 0; i < malfunctions.length; i++) {
    let action = {};

    const names = arrs[random(arrs.length)];

    for (let k = 0; k < names.length; k++) {
      action = {
        id: uuidv4(),
        name: names[k],
        malfunctionId: malfunctions[i].id,
      };
      actions.push(action);
    }
  }

  return actions;
};

const actions = createActions();

module.exports = actions;
