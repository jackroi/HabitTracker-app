
interface HabitHistoryEntry {
  date: Date;
  type: 'COMPLETED' | 'SKIPPED'
}

type HabitHistory = HabitHistoryEntry[];

const getHabits = () => {
  throw new Error("Not implemented yet");
}

const getHistory = (id: string): HabitHistory => {
  throw new Error("Not implemented yet");
}
