import { MinorTargetType } from './minor-target-type.model';
import { CardStat } from './card-stat.model';

export interface Action {
  id?: string;
  name: string;
}

export interface Status {
  id?: string;
  name: string;
}

export interface Target {
  id?: string;
  name: string;
  minorTargetTypeId: string;
  MinorTargetType?: MinorTargetType;
}

export interface Malfunction {
  id?: string;
  name: string;
}

export interface Operator {
  id?: string;
  name?: string;
  department?: string;
  tel?: string;
}

export interface OrderDetail {
  id?: string;
  date: string;
  operatorId: string;
  addrId: string;
  actionId: string;
  targetId: string;
  malfunctionId: string;
  statusId: string;
  remarks: string;
}

export interface Project {
  id?: string;
  name: string;
  date: string;
  operatorId: string;
  addrId: string;
  statusId: string;
  remarks: string;
}

export interface Camera {
  id?: string;
  name: string;
  date: string;
  operatorId: string;
  addrId: string;
  statusId: string;
  remarks: string;
}

export interface Addr {
  id?: string;
  name?: string;
  addr?: string;
  tel?: string;
  type?: string;
  streetId?: string;
  Street?: {
    id: string;
    name: string;
    Area: { id: string; name: string };
  };
}

export interface Stats {
  orderStat: CardStat;

  cameraStat: CardStat;

  projectStat: CardStat;

  pieOfMalfunctions: {
    lengend: [];
    series: [];
  };

  pieOfTargets: {
    lengend: [];
    series: [];
  };
}
