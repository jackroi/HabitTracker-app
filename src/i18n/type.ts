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

  /* Misc */
  confirm: string;
  create: string;
}
