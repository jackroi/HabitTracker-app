export default interface Translation {
  /* Screen names */
  // Auth
  loginScreenTitle: string;
  registerScreenTitle: string;
  // App
  homeScreenTitle: string;
  historyScreenTitle: string;
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

  /* Habit */
  habit: string;
  category: string;

  /* Habit creation */
  selectCategory: string;
  categorySelectionHeader: string;

  /* Settings */
  account: string;
  about: string;
  registrationDate: string;
  deleteAccount: string;
  deleteAccountAlertMessage: string;

  /* Misc */
  confirm: string;
  create: string;

  /* Alert dialog */
  cancel: string;
  delete: string;
}
