import { BooleanStorage } from "./boolean-storage";

const STORAGE_ITEMS_KEY = 'is24Hour';

class Is24HourStorage {
  private static instance: Is24HourStorage;
  private storage: BooleanStorage;

  private constructor() {
    this.storage = new BooleanStorage(STORAGE_ITEMS_KEY);
  }

  public static getInstance(): Is24HourStorage {
    return this.instance ?? (this.instance = new Is24HourStorage());
  }

  public get(): boolean {
    try {
      return this.storage.getValue();
    } catch (error: unknown) {
      this.logError(error);
      return false;
    }
  }

  public set(value: boolean): void {
    try {
        this.storage.setValue(value);
    } catch (error: unknown) {
      this.logError(error);
    }
  }

  public delete(): void {
    try {
      this.storage.deleteValue();
    } catch (error: unknown) {
      this.logError(error);
    }
  }

  private logError(error: unknown): void {
    let errorMessage = 'An error occurred in Is24HourStorage';
    if (error instanceof Error) {
      errorMessage += `: ${error.message}`;
    }
    console.error(errorMessage);
  }
}

export const is24HourStorage = Is24HourStorage.getInstance();