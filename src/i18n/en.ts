import Translation from './type';

const mapping: Translation = {
  /* Screen names */
  // Auth
  loginScreenTitle: 'Login',
  registerScreenTitle: 'Register',
  // App
  homeScreenTitle: 'Home',
  homeAddHabitScreenTitle: 'New habit',
  homeUpdateHabitScreenTitle: 'Update habit',
  homeAddReminderScreenTitle: 'New reminder',
  remindersScreenTitle: 'Reminders',
  statisticsScreenTitle: 'Statistics',
  statisticsDetailsScreenTitle: 'Habit statistics',
  settingsScreenTitle: 'Settings',
  settingsAccountScreenTitle: 'Account',
  settingsArchiveScreenTitle: 'Habit archive',
  settingsAboutScreenTitle: 'About',

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
  loginFailed: 'Login failed',
  emailAlreadyRegidtered: 'This email is already registered',
  registrationFailed: 'Registration failed',

  /* Habit */
  habit: 'Habit',
  category: 'Category',
  type: 'Type',
  daily: 'Daily',
  weekly: 'Weekly',
  monthly: 'Monthly',

  /* Habit creation/update/read */
  selectCategory: 'Select category',
  categorySelectionHeader: 'Select an existing category or create a new one',
  selectType: 'Select type',
  typeSelectionHeader: 'Select a type of habit',
  update: 'Update',
  updateHabit: 'Update',
  missingHabitName: 'Missing habit name',
  missingHabitCategory: 'Missing habit category',
  missingHabitType: 'Missing habit type',
  archiveFailed: 'Something went wrong while archiving the habit',
  unarchiveFailed: 'Something went wrong while unarchiving the habit',
  habitDeletionFailed: 'Something went wrong while deleting the habit',
  habitUpdateFailed: 'Something went wrong while updating the habit',
  habitCreationFailed: 'Something went wrong while creating the habit',
  habitLoadingFailed: 'Something went wrong while loading the habits',
  habitArchiveLoadingFailed: 'Something went wrong while loading the habit archive',
  habitStateUpdateFailed: 'Something went wrong while updating the habit state',
  habitInfoLoadingFailed: 'Something went wrong while loading the habit information',
  noHabitPresent: 'No habit present',
  noHabitArchivedPresent: 'No habit archived present',

  /* Statistics */
  activeHabitsStats: 'Active habits',
  archivedHabitsStats: 'Archived habits',
  completedStats: 'Completed',
  percentageStats: 'Percentage',
  bestStreakStats: 'Best streak',
  currentStreakStats: 'Current streak',
  creationDate: 'Creation date',
  statisticsLoadingFailed: 'Something went wrong while loading the statistics',

  /* Settings */
  account: 'Account',
  about: 'About',
  habitArchive: 'Habit archive',
  registrationDate: 'Registration date',
  deleteAccount: 'Delete account',
  deleteAccountAlertMessage: 'Are you sure you want to delete your account?',
  accountInfoLoadingFailed: 'Something went wrong while loading the account information',

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
  reminderCreationFailed: 'Something went wrong while creating the reminder',
  reminderLoadingFailed: 'Something went wrong while loading the reminders',
  addReminder: 'Add reminder',

  /* Alert dialog */
  cancel: 'Cancel',
  delete: 'Delete',
  archive: 'Archive',
  deleteHabit: 'Delete habit',
  deleteHabitAlertMessage: 'Are you sure you want to delete this habit?',
  archiveHabit: 'Archive habit',
  archiveHabit2: 'Archive',
  unarchive: 'Unarchive',
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
