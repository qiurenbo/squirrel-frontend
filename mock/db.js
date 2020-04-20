const {
  targets,
  actions,
  malfunctions,
  maintenances,
  maintenanceStats,
} = require("./maintenance");

const { addrs, operators, accounts } = require("./global");

module.exports = () => {
  const data = {
    maintenances: maintenances,
    addrs: addrs,
    targets: targets,
    operators: operators,
    actions: actions,
    malfunctions: malfunctions,
    maintenanceStats: maintenanceStats,
    accounts: accounts,
  };

  return data;
};
