const {
  operators,
  targets,
  actions,
  addrs,
  malfunctions,
  maintenances,
} = require("./maintenance");

module.exports = () => {
  const data = {
    maintenances: maintenances,
    addrs: addrs,
    targets: targets,
    operators: operators,
    actions: actions,
    malfunctions: malfunctions,
  };

  return data;
};
