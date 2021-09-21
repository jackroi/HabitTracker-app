import { DateTime } from "luxon";
import axios, { AxiosInstance, AxiosError } from 'axios';
import { AddHabitResponseBody,
  ErrorResponseBody,
  GetCategoriesResponseBody,
  GetGeneralStatsResponseBody,
  GetHabitHistoryResponseBody,
  GetHabitResponseBody,
  GetHabitsForDateResponseBody,
  GetHabitsResponseBody,
  GetHabitStatsResponseBody,
  GetUserResponseBody,
  LoginResponseBody,
  RegistrationResponseBody,
  SuccessResponseBody
} from "./httpTypes/responses";
import { HabitType } from "./models/Habit";
import { HistoryEntryType } from "./models/HistoryEntry";
import { err, ok, Result } from "../utils/Result";
import environment from "../environments/environment";


// Singleton
export class HabitTrackerApi {
  private static BASE_URL = `http://${environment.API_HOST}:${environment.API_PORT}/v${environment.API_VERSION}/`;

  private http: AxiosInstance;
  private token: string | null;

  private static instance: HabitTrackerApi | null = null;

  static getInstance(): HabitTrackerApi {
    if (!this.instance) {
      this.instance = new HabitTrackerApi();
    }

    return this.instance;
  }

  private constructor() {
    console.log(HabitTrackerApi.BASE_URL)
    this.http = axios.create({
      baseURL: HabitTrackerApi.BASE_URL,
      timeout: 3000,
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
      },
    });

    this.token = null;
  }

  setToken(token: string) {
    this.token = token;
  }

  unsetToken() {
    this.token = null;
  }

  private ensureToken() {
    if (!this.token) {
      throw new Error('Missing token');
    }
  }


  // Authentication


  /**
   *
   * @param name
   * @param email
   * @param password
   * @returns
   */
  async register(name: string, email: string, password: string): Promise<Result<string,string>> {
    try {
      const response = await this.http.request<RegistrationResponseBody>({
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
      const errorMessage: string = this.handleError(error);
      return err(errorMessage);
    }
  }


  /**
   *
   * @param email
   * @param password
   * @returns
   */
  async login(email: string, password: string): Promise<Result<string,string>> {
    try {
      const response = await this.http.request<LoginResponseBody>({
        method: 'GET',
        url: '/login',
        auth: {                     // Http Basic Authentication
          username: email,
          password: password,
        },
      });
      return ok(response.data.token);
    }
    catch (error) {
      const errorMessage: string = this.handleError(error);
      return err(errorMessage || 'Login failed');
    }
  }



  // Account management

  async getAccountInfo(): Promise<Result<GetUserResponseBody['user'],string>> {
    this.ensureToken();

    try {
      const response = await this.http.request<GetUserResponseBody>({
        method: 'GET',
        url: '/user',
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
      });
      return ok(response.data.user);
    }
    catch (error) {
      const errorMessage: string = this.handleError(error);
      return err(errorMessage);
    }
  }

  async deleteAccount(): Promise<Result<null,string>> {
    this.ensureToken();

    try {
      const response = await this.http.request<SuccessResponseBody>({
        method: 'DELETE',
        url: '/user',
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
      });
      return ok(null);
    }
    catch (error) {
      const errorMessage: string = this.handleError(error);
      return err(errorMessage);
    }
  }


  // Habit

  async getHabits(
    skip?: number,
    limit?: number,
    category?: string,
    filter?: 'all' | 'archived' | 'active'
  ): Promise<Result<GetHabitsResponseBody['habits'],string>> {
    this.ensureToken();

    try {
      const response = await this.http.request<GetHabitsResponseBody>({
        method: 'GET',
        url: '/habits',
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
        params: {
          skip: skip,
          limit: limit,
          category: category,
          filter: filter,
        },
      });
      return ok(response.data.habits);
    }
    catch (error) {
      const errorMessage: string = this.handleError(error);
      return err(errorMessage);
    }
  }

  async getHabitsForDate(
    date: string,
    skip?: number,
    limit?: number,
    category?: string,
    filter?: 'all' | 'archived' | 'active'
  ): Promise<Result<GetHabitsForDateResponseBody['habits'],string>> {
    this.ensureToken();

    try {
      const response = await this.http.request<GetHabitsForDateResponseBody>({
        method: 'GET',
        url: '/habits',
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
        params: {
          date: date,
          skip: skip,
          limit: limit,
          category: category,
          filter: filter,
        },
      });
      return ok(response.data.habits);
    }
    catch (error) {
      const errorMessage: string = this.handleError(error);
      return err(errorMessage);
    }
  }

  async createHabit(name: string, category: string, type: HabitType): Promise<Result<AddHabitResponseBody['habit'],string>> {
    this.ensureToken();

    try {
      const response = await this.http.request<AddHabitResponseBody>({
        method: 'POST',
        url: '/habits',
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
        data: {
          name: name,
          category: category,
          type: type,
        },
      });
      return ok(response.data.habit);
    }
    catch (error) {
      const errorMessage: string = this.handleError(error);
      return err(errorMessage);
    }
  }

  async getHabit(habitId: string): Promise<Result<GetHabitResponseBody['habit'],string>> {
    this.ensureToken();

    try {
      const response = await this.http.request<GetHabitResponseBody>({
        method: 'GET',
        url: `/habits/${habitId}`,
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
      });
      return ok(response.data.habit);
    }
    catch (error) {
      const errorMessage: string = this.handleError(error);
      return err(errorMessage);
    }
  }

  async updateHabit(habitId: string, name?: string, category?: string): Promise<Result<null,string>> {
    this.ensureToken();

    try {
      const response = await this.http.request<SuccessResponseBody>({
        method: 'PUT',
        url: `/habits/${habitId}`,
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
        data: {
          name: name,
          category: category,
        },
      });
      return ok(null);
    }
    catch (error) {
      const errorMessage: string = this.handleError(error);
      return err(errorMessage);
    }
  }

  private async archiveHabitHelper(habitId: string, archive: boolean): Promise<Result<null,string>> {
    this.ensureToken();

    try {
      const response = await this.http.request<SuccessResponseBody>({
        method: 'PUT',
        url: `/habits/${habitId}`,
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
        data: {
          archived: archive,
        },
      });
      return ok(null);
    }
    catch (error) {
      const errorMessage: string = this.handleError(error);
      return err(errorMessage);
    }
  }

  async archiveHabit(habitId: string): Promise<Result<null,string>> {
    return await this.archiveHabitHelper(habitId, true);
  }

  async unarchiveHabit(habitId: string): Promise<Result<null,string>> {
    return await this.archiveHabitHelper(habitId, false);
  }

  async deleteHabit(habitId: string): Promise<Result<null,string>> {
    this.ensureToken();

    try {
      const response = await this.http.request<SuccessResponseBody>({
        method: 'DELETE',
        url: `/habits/${habitId}`,
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
      });
      return ok(null);
    }
    catch (error) {
      const errorMessage: string = this.handleError(error);
      return err(errorMessage);
    }
  }

  async getHabitHistory(habitId: string): Promise<Result<GetHabitHistoryResponseBody['history'],string>> {
    this.ensureToken();

    try {
      const response = await this.http.request<GetHabitHistoryResponseBody>({
        method: 'GET',
        url: `/habits/${habitId}/history`,
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
      });
      return ok(response.data.history);
    }
    catch (error) {
      const errorMessage: string = this.handleError(error);
      return err(errorMessage);
    }
  }

  private async updateHabitHistoryHelper(habitId: string, date: DateTime, type: HistoryEntryType): Promise<Result<null,string>> {
    this.ensureToken();

    try {
      const response = await this.http.request<SuccessResponseBody>({
        method: 'POST',
        url: `/habits/${habitId}/history`,
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
        data: {
          date: date.toUTC().toISO(),
          type: type,
        },
      });
      return ok(null);
    }
    catch (error) {
      const errorMessage: string = this.handleError(error);
      return err(errorMessage);
    }
  }

  async completeHabit(habitId: string, date: DateTime): Promise<Result<null,string>> {
    return await this.updateHabitHistoryHelper(habitId, date, HistoryEntryType.COMPLETED);
  }

  async skipHabit(habitId: string, date: DateTime) {
    return await this.updateHabitHistoryHelper(habitId, date, HistoryEntryType.SKIPPED);
  }

  async deleteHabitHistoryEntry(habitId: string, date: DateTime): Promise<Result<null,string>> {
    this.ensureToken();

    const dateStringParam = date.toISODate();

    try {
      const response = await this.http.request<SuccessResponseBody>({
        method: 'DELETE',
        url: `/habits/${habitId}/history/${dateStringParam}`,
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
      });
      return ok(null);
    }
    catch (error) {
      const errorMessage: string = this.handleError(error);
      return err(errorMessage);
    }
  }



  // Statistics

  async getGeneralStats(): Promise<Result<GetGeneralStatsResponseBody['stats'],string>> {
    this.ensureToken();

    try {
      const response = await this.http.request<GetGeneralStatsResponseBody>({
        method: 'GET',
        url: `/stats`,
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
      });
      return ok(response.data.stats);
    }
    catch (error) {
      const errorMessage: string = this.handleError(error);
      return err(errorMessage);
    }
  }

  async getHabitStats(habitId: string): Promise<Result<GetHabitStatsResponseBody['stats'],string>> {
    this.ensureToken();

    try {
      const response = await this.http.request<GetHabitStatsResponseBody>({
        method: 'GET',
        url: `/stats/${habitId}`,
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
      });
      return ok(response.data.stats);
    }
    catch (error) {
      const errorMessage: string = this.handleError(error);
      return err(errorMessage);
    }
  }



  // Categories

  async getCategories(): Promise<Result<GetCategoriesResponseBody['categories'],string>> {
    this.ensureToken();

    try {
      const response = await this.http.request<GetCategoriesResponseBody>({
        method: 'GET',
        url: `/categories`,
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
      });
      return ok(response.data.categories);
    }
    catch (error) {
      const errorMessage: string = this.handleError(error);
      return err(errorMessage);
    }
  }

  async updateCategoryName(oldName: string, newName: string): Promise<Result<GetCategoriesResponseBody['categories'],string>> {
    this.ensureToken();

    try {
      const response = await this.http.request<GetCategoriesResponseBody>({
        method: 'PUT',
        url: `/categories/${oldName}`,
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
        data: {
          name: newName,
        },
      });
      return ok(response.data.categories);
    }
    catch (error) {
      const errorMessage: string = this.handleError(error);
      return err(errorMessage);
    }
  }



  // Error handling


  private handleAxiosError(error: AxiosError): string {
    let errorMessage: string;

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const errorBody = error.response.data as ErrorResponseBody;
      errorMessage = errorBody.errorMessage;      // ! could be undefined (when login using HTTP Basic Authentication)
    }
    else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      errorMessage = 'Timeout error';
    }
    else {
      // Something happened in setting up the request that triggered an Error
      errorMessage = 'Unknown error';
    }
    console.warn(errorMessage);
    return errorMessage;
  }

  private handleError(error: any): string {
    let errorMessage: string;
    if (axios.isAxiosError(error)) {
      // It's an AxiosError
      errorMessage = this.handleAxiosError(error);
    }
    else {
      // It's another type of error
      errorMessage = 'Unknown error';
      console.error(error);
    }
    return errorMessage;
  }

}
