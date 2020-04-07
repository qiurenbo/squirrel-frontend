const uuidv4 = require("uuid").v4;
const addrs = [
  {
    id: uuidv4(),
    name: "总馆外借",
    addr: "海盐塘路339号",
    tel: "82535009",
    type: "部门",
  },
  {
    id: uuidv4(),
    name: "秀洲分馆",
    addr: "中山西路887号",
    tel: "82535008",
    type: "分馆",
  },

  {
    id: uuidv4(),
    name: "普光村",
    addr: "海盐塘路339号",
    tel: "82555108",
    type: "村流通",
  },
];

module.exports = addrs;
