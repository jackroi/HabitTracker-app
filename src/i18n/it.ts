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
  type: 'Tipologia',

  /* Habit creation/update */
  selectCategory: 'Seleziona categoria',
  categorySelectionHeader: 'Seleziona una categoria esistente o creane una nuova',
  selectType: 'Seleziona tipologia',
  typeSelectionHeader: 'Seleziona una tipologia di habit',
  update: 'Aggiorna',

  /* Statistics */
  activeHabitsStats: 'Habit attivi',
  archivedHabitsStats: 'Habit archiviati',
  completedStats: 'Completati',
  percentageStats: 'Percentuale',
  bestStreakStats: 'Serie migliore',
  currentStreakStats: 'Serie attuale',
  creationDate: 'Data di creazione',

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

  /* Reminders */
  timeReminder: 'Tempo',
  locationReminder: 'Luogo',
  dailyReminders: 'Promemoria giornalieri',
  weeklyReminders: 'Promemoria settimanali',
  monthlyReminders: 'Promemoria mensili',
  locationReminders: 'Promemoria luogo',
  locationName: 'Nome luogo',
  deleteReminder: 'Elimina promemoria',
  deleteReminderAlertMessage: 'Sei sicuro di voler eliminare questo promemoria?',

  /* Alert dialog */
  cancel: 'Annulla',
  delete: 'Elimina',
  archive: 'Archivia',
  deleteHabit: 'Elimina habit',
  deleteHabitAlertMessage: 'Sei sicuro di voler eliminare questo habit?',
  archiveHabit: 'Archivia habit',
  archiveHabitAlertMessage: 'Sei sicuro di voler archiviare questo habit?',

  /* Misc */
  confirm: 'Conferma',
  create: 'Crea',
  author: 'Autore',
  version: 'Versione',
};

export default mapping;
