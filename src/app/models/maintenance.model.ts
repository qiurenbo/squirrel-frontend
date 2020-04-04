export class Maintenance {
  date: string;
  name: string;
  addr: string;
  action: string;
  device: string;
  type: string;
}

export class Maintenances {
  total: number;
  list: Maintenance[];
}
