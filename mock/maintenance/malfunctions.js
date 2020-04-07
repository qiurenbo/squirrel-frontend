const targets = require("./targets");
const uuidv4 = require("uuid").v4;
const { random } = require("../utils");
const createMalfunctions = () => {
  const arrs = [
    ["无法开机", "无法启动", "软件闪退"],
    ["无法开机", "无法上网"],
    ["界面卡住"],
  ];

  let malfunctions = [];

  for (let i = 0; i < targets.length; i++) {
    const names = arrs[random(targets.length)];

    for (let k = 0; k < names.length; k++) {
      let malfunction = {
        id: uuidv4(),
        name: names[k],
        targetId: targets[i].id,
      };

      malfunctions.push(malfunction);
    }
  }

  return malfunctions;
};

const malfunctions = createMalfunctions();

module.exports = malfunctions;
