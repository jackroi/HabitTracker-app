import { DateTime } from 'luxon';


export enum HistoryEntryType {
  COMPLETED = 'COMPLETED',
  SKIPPED = 'SKIPPED',
}

export interface HistoryEntry {
  date: Date;
  type: HistoryEntryType;
}

export interface ClientHistoryEntry {
  date: DateTime;
  type: HistoryEntryType;
}
