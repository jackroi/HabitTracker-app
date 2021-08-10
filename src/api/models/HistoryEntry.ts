// TODO valutare se renderlo un type = 'COMPLETED' | 'SKIPPED'

import { DateTime } from "luxon";

// TODO o magari assegnare le relative stringhe (al posto degli int)
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
