export default interface Translation {
  /* Screen names */
  // Auth
  loginScreenTitle: string;
  registerScreenTitle: string;
  // App
  homeScreenTitle: string;
  remindersScreenTitle: string;
  statisticsScreenTitle: string;
  settingsScreenTitle: string;

  /* Auth */
  login: string;
  logout: string;
  register: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  missingName: string;
  invalidEmail: string;
  missingPassword: string;
  passwordNotMatch: string;
  loginFailed: string;
  emailAlreadyRegidtered: string;
  registrationFailed: string;

  /* Habit */
  habit: string;
  category: string;
  type: string;

  /* Habit creation/update/read */
  selectCategory: string;
  categorySelectionHeader: string;
  selectType: string;
  typeSelectionHeader: string;
  update: string;
  missingHabitName: string;
  missingHabitCategory: string;
  missingHabitType: string;
  archiveFailed: string;
  unarchiveFailed: string;
  habitDeletionFailed: string;
  habitUpdateFailed: string;
  habitCreationFailed: string;
  habitLoadingFailed: string;
  habitArchiveLoadingFailed: string;
  habitStateUpdateFailed: string;
  habitInfoLoadingFailed: string;
  noHabitPresent: string;
  noHabitArchivedPresent: string;

  /* Statistics */
  activeHabitsStats: string;
  archivedHabitsStats: string;
  completedStats: string;
  percentageStats: string;
  bestStreakStats: string;
  currentStreakStats: string;
  creationDate: string;
  statisticsLoadingFailed: string;

  /* Settings */
  account: string;
  about: string;
  habitArchive: string;
  registrationDate: string;
  deleteAccount: string;
  deleteAccountAlertMessage: string;
  accountInfoLoadingFailed: string;

  /* Days of week */
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;

  /* Time of month */
  monthStart: string;
  monthHalf: string;
  monthEnd: string;

  /* Reminders */
  timeReminder: string;
  locationReminder: string;
  dailyReminders: string;
  weeklyReminders: string;
  monthlyReminders: string;
  locationReminders: string;
  locationName: string;
  deleteReminder: string;
  deleteReminderAlertMessage: string;
  noRemindersSetted: string;
  missingLocationReminderInfo: string;
  reminderCreationFailed: string;
  reminderLoadingFailed: string;

  /* Alert dialog */
  cancel: string;
  delete: string;
  archive: string;
  deleteHabit: string;
  deleteHabitAlertMessage: string;
  archiveHabit: string;
  archiveHabitAlertMessage: string;

  /* Notifications */
  notificationBody: string;

  /* Errors */
  loadingModalPickerDataError: string;

  /* Misc */
  confirm: string;
  create: string;
  author: string;
  version: string;
}
