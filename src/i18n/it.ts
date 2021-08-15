import Translation from './type';

const mapping: Translation = {
  /* Screen names */
  // Auth
  loginScreenTitle: 'Login',
  registerScreenTitle: 'Registrati',
  // App
  homeScreenTitle: 'Home',
  remindersScreenTitle: 'Promemoria',
  statisticsScreenTitle: 'Statistiche',
  settingsScreenTitle: 'Impostazioni',

  /* Auth */
  login: 'Login',
  logout: 'Logout',
  register: 'Registrati',
  name: 'Nome',
  email: 'Email',
  password: 'Password',
  confirmPassword: 'Conferma password',

  /* Habit */
  habit: 'Habit',
  category: 'Categoria',

  /* Habit creation/update */
  selectCategory: 'Seleziona categoria',
  categorySelectionHeader: 'Seleziona una categoria esistente o creane una nuova',
  update: 'Aggiorna',

  /* Settings */
  account: 'Account',
  about: 'About',
  habitArchive: 'Archivio habit',
  registrationDate: 'Data di registrazione',
  deleteAccount: 'Elimina account',
  deleteAccountAlertMessage: 'Sei sicuro di voler eliminare il tuo account?',

  /* Days of week */
  monday: 'Lunedì',
  tuesday: 'Martedì',
  wednesday: 'Mercoledì',
  thursday: 'Giovedì',
  friday: 'Venerdi',
  saturday: 'Sabato',
  sunday: 'Domenica',

  /* Time of month */
  monthStart: 'Inizio mese',
  monthHalf: 'Metà mese',
  monthEnd: 'Fine mese',

  /* Misc */
  confirm: 'Conferma',
  create: 'Crea',

  /* Alert dialog */
  cancel: 'Annulla',
  delete: 'Elimina',
  archive: 'Archivia',
  deleteHabit: 'Elimina habit',
  deleteHabitAlertMessage: 'Sei sicuro di voler eliminare questo habit?',
  archiveHabit: 'Archivia habit',
  archiveHabitAlertMessage: 'Sei sicuro di voler archiviare questo habit?',
}

export default mapping;
