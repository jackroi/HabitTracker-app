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

  /* Habit */
  habit: 'Habit',
  category: 'Category',

  /* Habit creation/update */
  selectCategory: 'Select category',
  categorySelectionHeader: 'Select an existing category or create a new one',
  update: 'Update',

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

  /* Misc */
  confirm: 'Confirm',
  create: 'Create',

  /* Alert dialog */
  cancel: 'Cancel',
  delete: 'Delete',
  archive: 'Archive',
  deleteHabit: 'Delete habit',
  deleteHabitAlertMessage: 'Are you sure you want to delete this habit?',
  archiveHabit: 'Archive habit',
  archiveHabitAlertMessage: 'Are you sure you want to archive this habit?',
}

export default mapping;
