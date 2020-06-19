import { Addr, Operator } from './order.model';
import { Purchase } from './purchase.model';

export interface Distribute {
  id: string; // ⇨ uuid'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
  date: string;
  number?: number;
  purchaseId?: string;
  addrId?: string;
  Purchase?: Purchase;
  Operator?: Operator;
  Addr?: Addr;
  operatorId?: string;
  receiver?: string;
  remarks?: string;
}
