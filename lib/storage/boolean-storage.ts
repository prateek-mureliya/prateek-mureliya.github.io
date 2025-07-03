export class BooleanStorage {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  public getValue(): boolean {
    try {
      const data = localStorage.getItem(this.key);
      if (!data) return false;

      return JSON.parse(data) as boolean;
    } catch {
      throw new Error('Failed to retrieve value from storage');
    }
  }

  public setValue(value: boolean): void {
    try {
      localStorage.setItem(this.key, JSON.stringify(value));
    } catch {
      throw new Error('Failed to set value in storage');
    }
  }

  public deleteValue(): void {
    try {
      localStorage.removeItem(this.key);
    } catch {
      throw new Error('Failed to clear value from storage');
    }
  }
}