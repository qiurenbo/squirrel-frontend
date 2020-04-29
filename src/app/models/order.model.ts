export class Action {
  id: string;
  name: string;
}

export class Target {
  id: string;
  name: string;
}

export class Malfunction {
  id: string;
  name: string;
}

export class Operator {
  id: string;
  name: string;
  department: string;
  tel: string;
}

export class OrderDetail {
  id: string;
  date: string;
  operatorId: string;
  addrId: string;
  actionId: string;
  targetId: string;
  malfunctionId: string;
}

// export class Orders {
//   total: number;
//   list: Order[];
// }

export class Addr {
  id: string;
  name: string;
  addr: string;
  tel: string;
  type: string;
}

export class Stats {
  orderOfToday: string;
  orderOfCurMonth: string;
  orderOfCurYear: string;
  orderOfHistory: string;

  pieOfMalfunctions: {
    lengend: [];
    series: [];
  };

  pieOfTargets: {
    lengend: [];
    series: [];
  };
}
