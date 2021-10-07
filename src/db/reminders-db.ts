import * as SQLite from "expo-sqlite";
import { ReminderInfo } from "../types/Reminder";
import { err, ok, Result } from "../utils/Result";

/**
 *
 * habitId
 * notificationId
 * reminderType
 *
 *
 */

export type DbReminder = {
  id: number,
  habitId: string,
  notificationId: string,
  email: string,
  reminderInfo: ReminderInfo,
}

const TABLE_NAME = 'reminder';

export function openDatabase() {
  const db = SQLite.openDatabase("reminders.db");
  return db;
}


export function createTable(db: SQLite.WebSQLDatabase) {
  db.transaction((tx) => {
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
        id              INTEGER PRIMARY KEY AUTOINCREMENT,
        habitId         STRING,
        notificationId  STRING,
        email           STRING,
        reminderInfo    STRING
      );
    `,
    undefined,
    () => console.log('Table created'),
    (_, err) => {
      console.log('Error', err);
      return true;
    });
  });
}

export function dropTable(db: SQLite.WebSQLDatabase) {
  db.transaction((tx) => {
    tx.executeSql(`DROP TABLE ${TABLE_NAME}`,
    undefined,
    () => console.log('Table dropped'),
    (_, err) => {
      console.log('Error', err);
      return true;
    });
  });
}


export function getReminders(db: SQLite.WebSQLDatabase): Promise<Result<DbReminder[], string>> {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM ${TABLE_NAME};`,
        undefined,
        (_, res) => {
          const resultArray = (res.rows as any)._array as any[];
          const parsedArray: DbReminder[] = resultArray.map((el) => ({
            id: el.id,
            habitId: el.habitId,
            notificationId: el.notificationId,
            email: el.email,
            reminderInfo: JSON.parse(el.reminderInfo),
          }));
          resolve(ok(parsedArray));
        },
        (_, error) => {
          resolve(err('Error occurred while getting reminders'));
          return true;
        }
      );
    });
  });
}


export function addReminder(db: SQLite.WebSQLDatabase, data: Omit<DbReminder, 'id'>) {
  return new Promise<void>((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(`
          INSERT INTO ${TABLE_NAME} (
            habitId,
            notificationId,
            email,
            reminderInfo
          ) values (
            ?,
            ?,
            ?,
            ?
          )`,
          [data.habitId, data.notificationId, data.email, JSON.stringify(data.reminderInfo)],
          (_, __) => resolve(),
          (_, err) => {
            reject(err);
            return true;
          }
        );
      }
    );
  });
}

export function updateReminderNotificationId(db: SQLite.WebSQLDatabase, id: number, newNotificationId: string) {
  return new Promise<void>((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(`
          UPDATE ${TABLE_NAME}
          SET notificationId = ?
          WHERE id = ?`,
          [newNotificationId, id],
          (_, __) => resolve(),
          (_, err) => {
            reject(err);
            return true;
          }
        );
      }
    );
  });
}

export function deleteReminder(db: SQLite.WebSQLDatabase, id: number) {
  return new Promise<void>((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(`
          DELETE FROM ${TABLE_NAME}
          WHERE id = ?`,
          [id],
          (_, __) => resolve(),
          (_, err) => {
            reject(err);
            return true;
          }
        );
      }
    );
  });
}
