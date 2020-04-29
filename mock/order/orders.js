const uuidv4 = require("uuid").v4;
const actions = require("./actions");
const targets = require("./targets");
const malfunctions = require("./malfunctions");
const { random, randomYMD } = require("../utils");
const addrs = require("../global/addrs");
const operators = require("../global/operators");

const createOrderList = (number) => {
  let orders = [];
  for (let i = 0; i < number; i++) {
    order = {};
    order.id = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
    order.date = randomYMD();
    order.addrId = addrs[random(addrs.length)].id;
    order.operatorId = operators[random(operators.length)].id;
    order.actionId = actions[random(actions.length)].id;
    order.targetId = targets[random(targets.length)].id;
    order.malfunctionId = malfunctions[random(malfunctions.length)].id;

    orders.push(order);
  }
  return orders;
};

const orders = createOrderList(100);
module.exports = orders;
