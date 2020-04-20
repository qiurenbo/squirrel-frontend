const maintenanceStats = {
  orderOfToday: 45,
  orderOfCurMonth: 95,

  orderOfCurYear: 185,
  orderOfHistory: 325,

  pieOfMalfunctions: {
    lengend: ["无法开机", "无法联网", "软件异常"],
    series: [
      { value: 335, name: "无法开机" },
      { value: 310, name: "无法联网" },
      { value: 234, name: "软件异常" },
    ],
  },

  pieOfTargets: {
    lengend: ["海恒——自助借还机", "联想——业务机", "TPLink——路由器"],
    series: [
      { value: 35, name: "海恒——自助借还机" },
      { value: 10, name: "联想——业务机" },
      { value: 24, name: "TPLink——路由器" },
    ],
  },
};

module.exports = maintenanceStats;
