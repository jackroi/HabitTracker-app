// TODO valutare se renderlo un type = 'COMPLETED' | 'SKIPPED'
// TODO o magari assegnare le relative stringhe (al posto degli int)
export enum HistoryEntryType {
  COMPLETED = 'COMPLETED',
  SKIPPED = 'SKIPPED',
}

export interface HistoryEntry {
  date: Date;
  type: HistoryEntryType;
}
