import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

export class StorageService {
  private readonly PREFIX = "thoth";

  private buildKey(key: string): string {
    return `${this.PREFIX}.${key}`;
  }

  async setItem(key: string, value: string | null): Promise<void> {
    key = this.buildKey(key);
    if (Platform.OS === "web") {
      try {
        if (value === null) localStorage.removeItem(key);
        else localStorage.setItem(key, value);
      } catch (e) {
        console.error("Local storage is unavailable:", e);
      }
    } else {
      if (value == null) await SecureStore.deleteItemAsync(key);
      else await SecureStore.setItemAsync(key, value);
    }
  }

  async getItemAsync(key: string): Promise<string | null> {
    key = this.buildKey(key);
    try {
      if (Platform.OS === "web") {
        if (typeof localStorage !== "undefined")
          return await Promise.resolve(localStorage.getItem(key));
        throw new Error("Local storage is unavailable");
      }
      return await SecureStore.getItemAsync(key);
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  getItem(key: string, setState: (value: string | null) => void): void {
    this.getItemAsync(key)
      .then((value) => {
        setState(value);
      })
      .catch(console.error);
  }

  async clearItem(key: string): Promise<void> {
    key = this.buildKey(key);
    try {
      if (Platform.OS === "web") localStorage.removeItem(key);
      else await SecureStore.deleteItemAsync(key);
    } catch (e) {
      console.error(e);
    }
  }
}

export const storage = new StorageService();
