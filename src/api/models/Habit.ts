import { DateTime } from 'luxon';
import { HistoryEntry } from './HistoryEntry';


export enum HabitType {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
}

export interface Habit {
  name: string;
  creationDate: Date;
  category: string;
  type: HabitType;
  archived: boolean;
  history: HistoryEntry[];
  userEmail: string;
}


export interface ClientHabit {
  id: string;
  name: string;
  creationDate: DateTime;
  category: string;
  type: HabitType;
  archived: boolean;
}


export enum HabitState {
  COMPLETED = 'COMPLETED',
  SKIPPED = 'SKIPPED',
  NOT_COMPLETED = 'NOT_COMPLETED',
}
