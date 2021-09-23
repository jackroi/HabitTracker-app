
export enum ReminderType {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  LOCATION = 'LOCATION',
}

export type DailyReminderInfo = {
  type: ReminderType.DAILY;
  time: {
    hours: number;
    minutes: number;
  };
}

export type WeeklyReminderInfo = {
  type: ReminderType.WEEKLY;
  time: {
    dayOfWeek: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
    hours: number;
    minutes: number;
  };
}

export type MonthlyReminderInfo = {
  type: ReminderType.MONTHLY;
  time: {
    monthTime: 'monthStart' | 'monthHalf' | 'monthEnd';
  };
}

export type LocationReminderInfo = {
  type: ReminderType.LOCATION;
  location: {
    name: string;
  };
}

export type ReminderInfo = DailyReminderInfo | WeeklyReminderInfo | MonthlyReminderInfo | LocationReminderInfo;
