const addrs = require("./addrs");
const { random } = require("../utils");
const uuidv4 = require("uuid").v4;
const operators = [
  {
    id: uuidv4(),
    name: "郭云峰",
    tel: "17838431923",
    department: "技术部",
  },
  {
    id: uuidv4(),
    name: "陆志强",
    tel: "13838421923",
    department: "技术部",
  },
];

module.exports = operators;
