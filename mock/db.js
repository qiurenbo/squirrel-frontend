const {
  targets,
  actions,
  malfunctions,
  orders,
  orderStats,
} = require("./order");

const { addrs, operators, accounts } = require("./global");

module.exports = () => {
  const data = {
    orders: orders,
    addrs: addrs,
    targets: targets,
    operators: operators,
    actions: actions,
    malfunctions: malfunctions,
    orderStats: orderStats,
    accounts: accounts,
    users: [],
  };

  return data;
};
