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
}

export class MaintenanceDetail {
  date: string;
  operator: Operator;
  addr: Addr;
  action: Action;
  target: Target;
  malfunction: Malfunction;
}

// export class Maintenances {
//   total: number;
//   list: Maintenance[];
// }

export class Addr {
  id: string;
  name: string;
  addr: string;
  tel: string;
  type: string;
}
