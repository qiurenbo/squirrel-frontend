export class Maintenance {
  date: string;
  name: string;
  addr: Addr;
  action: string;
  target: string;
  type: string;
}

export class Maintenances {
  total: number;
  list: Maintenance[];
}

export class Addr {
  id: string;
  name: string;
  addr: string;
  tel: string;
  type: string;
}

export class Target {
  id: string;
  name: string;
  type: string;
  brand: string;
}
