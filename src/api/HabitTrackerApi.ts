
// interface HabitHistoryEntry {
//   date: Date;
//   type: 'COMPLETED' | 'SKIPPED'
// }

import { DateTime } from "luxon";
import axios, { AxiosInstance, AxiosError } from 'axios';

// type HabitHistory = HabitHistoryEntry[];

// const getHabits = () => {
//   throw new Error("Not implemented yet");
// }

// const getHistory = (id: string): HabitHistory => {
//   throw new Error("Not implemented yet");
// }

/////////////////////////////////////////////////////////

// TODO valutare se fare qualche validazione parametri

class HabitTrackerApi {
  // TODO .env
  private static BASE_URL = 'http://localhost:8000/v0.0.1/';
  private http: AxiosInstance;
  private token: string | null;

  constructor() {
    this.http = axios.create({
      baseURL: HabitTrackerApi.BASE_URL,
      timeout: 3000,
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
      },
    });

    // TODO
    this.token = null;
  }

  setToken(token: string) {
    this.token = token;
  }

  // TODO metterlo all'inizio dei metodi che richiedono autorizzazione
  private ensureToken() {
    if (!this.token) {
      throw new Error('Missing token');
    }
  }

  async register(name: string, email: string, password: string): Promise<Result<string,string>> {
    // TODO type
    type RegistrationResponse = {
      error: boolean,
      statusCode: string,
      token: string,
    }

    type ErrorResponse = {
      error: boolean,
      statusCode: string,
      errorMessage: string,
    }

    try {
      const response = await this.http.request<RegistrationResponse>({
        method: 'POST',
        url: '/register',
        data: {
          name: name,
          email: email,
          password: password,
        },
      });
      return ok(response.data.token);
    }
    catch (error) {
      let errorMessage: string;
      if (axios.isAxiosError(error)) {
        // It's an AxiosError
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.warn(error.response.data);
          console.warn(error.response.status);
          console.warn(error.response.headers);
          const errorBody = error.response.data as ErrorResponse;
          errorMessage = errorBody.errorMessage
        }
        else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.warn(error.request);
          errorMessage = 'Timeout error';
          // TODO valutare un throw (in generale per gli errori di timeout)
        }
        else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error', error.message);
          errorMessage = 'Unknown error';
        }
        console.warn(error.config);
      }
      else {
        // It's another type of error
        errorMessage = 'Unknown error';
        console.error(error);
      }
      return err(errorMessage);
    }
  }
}


/////////////////////////////////////////////////////////

// TODO maybe una classe che contenga token e i seguenti metodi
type Ok<T,E> = { success: true, value: T };
type Err<T,E> = { success: false, error: E };
type Result<T,E> = Ok<T,E> | Err<T,E>;

const ok = <T, E>(value: T): Result<T, E> => ({ success: true, value: value });
const err = <T, E>(error: E): Result<T, E> => ({ success: false, error: error });

// Authentication

function makeHttpRequest() {

}

async function register(name: string, email: string, password: string): Promise<Result<string,string>> {
  return ok('ciao');
}

async function login(email: string, password: string) {

}


async function logout() {

}


// Account management

async function getAccountInfo() {

}

async function deleteAccount() {

}


// Habit

async function getHabits(skip?: number, limit?: number, category?: string, filter?: 'all' | 'archived' | 'active') {

}

async function createHabit(name: string, category: string, type: 'DAILY' | 'WEEKLY' | 'MONTHLY') {
  // TODO creare enum come lato server
}

async function getHabit(habitId: string) {

}

async function updateHabit(habitId: string, name?: string, category?: string) {

}

async function archiveHabit(habitId: string) {

}

async function unarchiveHabit(habitId: string) {

}

async function deleteHabit(habitId: string) {

}

async function getHabitHistory(habitId: string) {

}

async function completeHabit(habitId: string, date: DateTime) {

}

async function skipHabit(habitId: string, date: DateTime) {

}

async function deleteHabitHistoryEntry(habitId: string, date: DateTime) {

}


// Statistics

async function getGeneralStats() {

}

async function getHabitStats(habitId: string) {

}


// Categories

async function getCategories() {

}

async function updateCategoryName(oldName: string, newName: string) {

}
