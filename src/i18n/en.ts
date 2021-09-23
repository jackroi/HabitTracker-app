import Translation from './type';

const mapping: Translation = {
  /* Screen names */
  // Auth
  loginScreenTitle: 'Login',
  registerScreenTitle: 'Register',
  // App
  homeScreenTitle: 'Home',
  remindersScreenTitle: 'Reminders',
  statisticsScreenTitle: 'Statistics',
  settingsScreenTitle: 'Settings',

  /* Auth */
  login: 'Login',
  logout: 'Logout',
  register: 'Register',
  name: 'Name',
  email: 'Email',
  password: 'Password',
  confirmPassword: 'Confirm password',
  missingName: 'Missing name',
  invalidEmail: 'Invalid email',
  missingPassword: 'Missing password',
  passwordNotMatch: 'The passwords don\'t match',

  /* Habit */
  habit: 'Habit',
  category: 'Category',
  type: 'Type',

  /* Habit creation/update */
  selectCategory: 'Select category',
  categorySelectionHeader: 'Select an existing category or create a new one',
  selectType: 'Select type',
  typeSelectionHeader: 'Select a type of habit',
  update: 'Update',
  missingHabitName: 'Missing habit name',
  missingHabitCategory: 'Missing habit category',
  missingHabitType: 'Missing habit type',

  /* Statistics */
  activeHabitsStats: 'Active habits',
  archivedHabitsStats: 'Archived habits',
  completedStats: 'Completed',
  percentageStats: 'Percentage',
  bestStreakStats: 'Best streak',
  currentStreakStats: 'Current streak',
  creationDate: 'Creation date',

  /* Settings */
  account: 'Account',
  about: 'About',
  habitArchive: 'Habit archive',
  registrationDate: 'Registration date',
  deleteAccount: 'Delete account',
  deleteAccountAlertMessage: 'Are you sure you want to delete your account?',

  /* Days of week */
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday',

  /* Time of month */
  monthStart: 'Start month',
  monthHalf: 'Mid month',
  monthEnd: 'End month',

  /* Reminders */
  timeReminder: 'Time',
  locationReminder: 'Location',
  dailyReminders: 'Daily reminders',
  weeklyReminders: 'Weekly reminders',
  monthlyReminders: 'Monthly reminders',
  locationReminders: 'Location reminders',
  locationName: 'Location name',
  deleteReminder: 'Delete reminder',
  deleteReminderAlertMessage: 'Are you sure you want to delete this reminder?',
  noRemindersSetted: 'No reminders setted',
  missingLocationReminderInfo: 'Missing location name or location marker',

  /* Alert dialog */
  cancel: 'Cancel',
  delete: 'Delete',
  archive: 'Archive',
  deleteHabit: 'Delete habit',
  deleteHabitAlertMessage: 'Are you sure you want to delete this habit?',
  archiveHabit: 'Archive habit',
  archiveHabitAlertMessage: 'Are you sure you want to archive this habit?',

  /* Notifications */
  notificationBody: 'Remember to complete the habit',

  /* Errors */
  loadingModalPickerDataError: 'Something went wrong loading the data',

  /* Misc */
  confirm: 'Confirm',
  create: 'Create',
  author: 'Author',
  version: 'Version',
}

export default mapping;
