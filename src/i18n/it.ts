import Translation from './type';

const mapping: Translation = {
  /* Screen names */
  // Auth
  loginScreenTitle: 'Login',
  registerScreenTitle: 'Registrati',
  // App
  homeScreenTitle: 'Home',
  homeAddHabitScreenTitle: 'Nuovo habit',
  homeUpdateHabitScreenTitle: 'Modifica habit',
  homeAddReminderScreenTitle: 'Nuovo promemoria',
  remindersScreenTitle: 'Promemoria',
  statisticsScreenTitle: 'Statistiche',
  statisticsDetailsScreenTitle: 'Statistiche habit',
  settingsScreenTitle: 'Impostazioni',
  settingsAccountScreenTitle: 'Account',
  settingsArchiveScreenTitle: 'Archivio habit',
  settingsAboutScreenTitle: 'About',

  /* Auth */
  login: 'Login',
  logout: 'Logout',
  register: 'Registrati',
  name: 'Nome',
  email: 'Email',
  password: 'Password',
  confirmPassword: 'Conferma password',
  missingName: 'Nome mancante',
  invalidEmail: 'Email non valida',
  missingPassword: 'Password mancante',
  passwordNotMatch: 'Le password sono diverse',
  loginFailed: 'Login fallito',
  emailAlreadyRegidtered: 'Questa email è gia registrata',
  registrationFailed: 'Registrazione fallita',

  /* Habit */
  habit: 'Habit',
  category: 'Categoria',
  type: 'Tipologia',

  /* Habit creation/update/read */
  selectCategory: 'Seleziona categoria',
  categorySelectionHeader: 'Seleziona una categoria esistente o creane una nuova',
  selectType: 'Seleziona tipologia',
  typeSelectionHeader: 'Seleziona una tipologia di habit',
  update: 'Aggiorna',
  missingHabitName: 'Nome habit mancante',
  missingHabitCategory: 'Categoria habit mancante',
  missingHabitType: 'Tipologia habit mancante',
  archiveFailed: 'Qualcosa è andato storto archiviando l\'habit',
  unarchiveFailed: 'Qualcosa è andato storto disarchiviando l\'habit',
  habitDeletionFailed: 'Qualcosa è andato storto eliminando l\'habit',
  habitUpdateFailed: 'Qualcosa è andato storto aggiornando l\'habit',
  habitCreationFailed: 'Qualcosa è andato storto creando l\'habit',
  habitLoadingFailed: 'Qualcosa è andato storto caricando gli habit',
  habitArchiveLoadingFailed: 'Qualcosa è andato storto caricando l\'archivio degli habit',
  habitStateUpdateFailed: 'Qualcosa è andato storto aggiornando lo stato dell\'habit',
  habitInfoLoadingFailed: 'Qualcosa è andato storto caricando informazioni sull\'habit',
  noHabitPresent: 'Nessun habit presente',
  noHabitArchivedPresent: 'Nessun habit archiviato presente',

  /* Statistics */
  activeHabitsStats: 'Habit attivi',
  archivedHabitsStats: 'Habit archiviati',
  completedStats: 'Completati',
  percentageStats: 'Percentuale',
  bestStreakStats: 'Serie migliore',
  currentStreakStats: 'Serie attuale',
  creationDate: 'Data di creazione',
  statisticsLoadingFailed: 'Qualcosa è andato storto caricando le statistiche',

  /* Settings */
  account: 'Account',
  about: 'About',
  habitArchive: 'Archivio habit',
  registrationDate: 'Data di registrazione',
  deleteAccount: 'Elimina account',
  deleteAccountAlertMessage: 'Sei sicuro di voler eliminare il tuo account?',
  accountInfoLoadingFailed: 'Qualcosa è andato storto caricando informazioni sull\'account',

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
  noRemindersSetted: 'Nessun promemoria impostato',
  missingLocationReminderInfo: 'Nome o marker posizione mancante',
  reminderCreationFailed: 'Qualcosa è andato storto creando il promemoria',
  reminderLoadingFailed: 'Qualcosa è andato storto caricando i promemoria',

  /* Alert dialog */
  cancel: 'Annulla',
  delete: 'Elimina',
  archive: 'Archivia',
  deleteHabit: 'Elimina habit',
  deleteHabitAlertMessage: 'Sei sicuro di voler eliminare questo habit?',
  archiveHabit: 'Archivia habit',
  archiveHabitAlertMessage: 'Sei sicuro di voler archiviare questo habit?',

  /* Notifications */
  notificationBody: 'Ricordati di completare l\'habit',

  /* Errors */
  loadingModalPickerDataError: 'Qualcosa è andato storto caricando i dati',

  /* Misc */
  confirm: 'Conferma',
  create: 'Crea',
  author: 'Autore',
  version: 'Versione',
};

export default mapping;
