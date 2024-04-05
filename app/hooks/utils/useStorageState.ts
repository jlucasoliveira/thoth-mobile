import * as React from "react";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

/*
  Get from https://docs.expo.dev/router/reference/authentication/#example-authentication-context
*/

function buildKey(key: string): string {
  return `thoth.${key}`;
}

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

function useAsyncState<T>(initialValue: [boolean, T | null] = [true, null]): UseStateHook<T> {
  return React.useReducer(
    (state: [boolean, T | null], action: T | null = null): [boolean, T | null] => [false, action],
    initialValue,
  ) as UseStateHook<T>;
}

export async function setStorageItemAsync(key: string, value: string | null): Promise<void> {
  key = buildKey(key);
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

export function useStorageState(key: string): UseStateHook<string> {
  const [state, setState] = useAsyncState<string>();

  React.useEffect(() => {
    key = buildKey(key);
    if (Platform.OS === "web") {
      try {
        if (typeof localStorage !== "undefined") setState(localStorage.getItem(key));
      } catch (e) {
        console.error("Local storage is unavailable:", e);
      }
    } else {
      SecureStore.getItemAsync(key)
        .then((value) => {
          setState(value);
        })
        .catch((error) => {
          console.error(`Secure store was unable to find a entry for the key: ${key}`, error);
        });
    }
  }, [key]);

  const setValue = React.useCallback(
    async (value: string | null) => {
      setState(value);
      await setStorageItemAsync(buildKey(key), value);
    },
    [key],
  );

  return [state, setValue];
}
