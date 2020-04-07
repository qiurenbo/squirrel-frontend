const addrs = require("./addrs");
const { random } = require("../utils");
const uuidv4 = require("uuid").v4;
const operators = [
  {
    id: uuidv4(),
    name: "郭云峰",
    tel: "17838431923",
    addrId: addrs[random(addrs.length)].id,
  },
  {
    id: uuidv4(),
    name: "陆志强",
    tel: "13838421923",
    addrId: addrs[random(addrs.length)].id,
  },
];

module.exports = operators;
