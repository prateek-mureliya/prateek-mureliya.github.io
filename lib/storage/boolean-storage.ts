export class BooleanStorage {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  public getValue(): boolean {
    const data = localStorage.getItem(this.key);
    if (!data) return false;

    return JSON.parse(data) as boolean;
  }

  public setValue(value: boolean): void {
    localStorage.setItem(this.key, JSON.stringify(value));
  }

  public deleteValue(): void {
    localStorage.removeItem(this.key);
  }
}