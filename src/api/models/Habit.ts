import { DateTime } from 'luxon';
import { HistoryEntry } from './HistoryEntry';


// TODO valutare se renderlo un type = 'DAILY' | 'WEEKLY' | 'MONTHLY
export enum HabitType {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
}

export interface Habit {
  name: string;
  creationDate: Date;       // TODO valutare se usare luxon
  category: string;
  type: HabitType;
  archived: boolean;

  // TODO valutare se ha senso che sia embedded
  history: HistoryEntry[];

  userEmail: string;
}


export interface ClientHabit {
  id: string;
  name: string;
  creationDate: DateTime;       // TODO valutare se usare luxon
  category: string;
  type: HabitType;
  archived: boolean;
}


export enum HabitState {
  COMPLETED = 'COMPLETED',
  SKIPPED = 'SKIPPED',
  NOT_COMPLETED = 'NOT_COMPLETED',
}
