export interface MinorTargetType {
  id?: string;
  name: string;
  MajorTargetType: MajorTargetType;
}

export interface MajorTargetType {
  id?: string;
  name: string;
}
