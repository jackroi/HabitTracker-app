import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { NotificationTriggerInput } from 'expo-notifications';
import { DailyReminderInfo, MonthlyReminderInfo, ReminderInfo, ReminderType, WeeklyReminderInfo } from '../types/Reminder';
import { Platform } from 'react-native';
import { t } from 'i18n-js';


export const scheduleNotification = async (habitName: string, reminderInfo: ReminderInfo) => {
  // Schedule the notification
  let notificationId: string;
  switch (reminderInfo.type) {
    case ReminderType.DAILY:
      notificationId = await scheduleDailyNotification(habitName, reminderInfo.time);
      break;

    case ReminderType.WEEKLY:
      notificationId = await scheduleWeeklyNotification(habitName, reminderInfo.time);
      break;

    case ReminderType.MONTHLY:
      // notificationId = await scheduleMonthlyNotification(habitName, reminderInfo.time);
      notificationId = '---';
      break;

    case ReminderType.LOCATION:
      notificationId = '---';
      break;

    default:
      const _exhaustiveCheck: never = reminderInfo;
      return _exhaustiveCheck;
  }

  return notificationId;
};

const scheduleNotificationHelper = (habitName: string, trigger: NotificationTriggerInput) => {
  // Schedule notification
  const schedulingOptions = {
    content: {
      title: habitName,
      body: t('notificationBody'),
      sound: true,
      priority: Notifications.AndroidNotificationPriority.HIGH,
      color: 'blue',
    },
    trigger: trigger,
  };

  // Notifications show only when app is not active.
  // (ie. another app being used or device's screen is locked)
  return Notifications.scheduleNotificationAsync(
    schedulingOptions,
  );
};


const scheduleDailyNotification = (habitName: string, time: DailyReminderInfo['time']) => {
  const trigger: NotificationTriggerInput = {
    hour: time.hours,
    minute: time.minutes,
    repeats: true,
  };
  return scheduleNotificationHelper(habitName, trigger);
};

const scheduleWeeklyNotification = (habitName: string, time: WeeklyReminderInfo['time']) => {
  let weekday: number;
  switch (time.dayOfWeek) {
    case 'monday':
      weekday = 2;
      break;

    case 'tuesday':
      weekday = 3;
      break;

    case 'wednesday':
      weekday = 4;
      break;

    case 'thursday':
      weekday = 5;
      break;

    case 'friday':
      weekday = 6;
      break;

    case 'saturday':
      weekday = 7;
      break;

    case 'sunday':
      weekday = 1;
      break;

    default:
      const _exhaustiveCheck: never = time.dayOfWeek;
      return _exhaustiveCheck;
  }

  const trigger: NotificationTriggerInput = {
    weekday: weekday,
    hour: time.hours,
    minute: time.minutes,
    repeats: true,
  };
  return scheduleNotificationHelper(habitName, trigger);
};


const scheduleMonthlyNotification = (habitName: string, time: MonthlyReminderInfo['time']) => {
  // const trigger: NotificationTriggerInput = {

  //   repeats: true,
  // };
  // return scheduleNotification(habitName, trigger);
};




// const handleNotification = () => {
//   console.warn('ok! got your notif', new Date());
//   alert('noti');
// };

export async function askNotificationPermission() {
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      console.warn('Notification permission not granted');
      return;
    }
  } else {
    alert('Must use physical device for Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
}
