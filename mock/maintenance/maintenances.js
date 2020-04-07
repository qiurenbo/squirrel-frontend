const uuidv4 = require("uuid").v4;
const operators = require("./operators");
const actions = require("./actions");
const targets = require("./targets");
const addrs = require("./addrs");
const malfunctions = require("./malfunctions");
const { random, randomYMD } = require("../utils");

const createMaintenanceList = (number) => {
  let maintenances = [];
  for (let i = 0; i < number; i++) {
    maintenance = {};
    maintenance.id = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
    maintenance.date = randomYMD();
    maintenance.addrId = addrs[random(addrs.length)].id;
    maintenance.operatorId = operators[random(operators.length)].id;
    maintenance.actionId = actions[random(actions.length)].id;
    maintenance.targetId = targets[random(targets.length)].id;
    maintenance.malfunctionId = malfunctions[random(malfunctions.length)].id;

    maintenances.push(maintenance);
  }
  return maintenances;
};

const maintenances = createMaintenanceList(100);
module.exports = maintenances;
