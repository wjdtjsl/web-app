export interface Student {
  id: number;
  number: number;
}

export interface Group {
  id: number;
  name: string;
  students: Student[];
}

export enum GroupingMethod {
  RANDOM = 'RANDOM',
  SEQUENTIAL = 'SEQUENTIAL',
}

export interface AppState {
  totalStudents: number;
  groupCount: number;
  method: GroupingMethod;
  groups: Group[];
  generatedAt: Date | null;
}
