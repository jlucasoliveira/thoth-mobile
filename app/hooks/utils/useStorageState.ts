import * as React from "react";
import { storage } from "@/utils/storage";

/*
  Get from https://docs.expo.dev/router/reference/authentication/#example-authentication-context
*/

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

function useAsyncState<T>(initialValue: [boolean, T | null] = [true, null]): UseStateHook<T> {
  return React.useReducer(
    (state: [boolean, T | null], action: T | null = null): [boolean, T | null] => [false, action],
    initialValue,
  ) as UseStateHook<T>;
}

export async function setStorageItemAsync(key: string, value: string | null): Promise<void> {
  await storage.setItem(key, value);
}

export function useStorageState(key: string): UseStateHook<string> {
  const [state, setState] = useAsyncState<string>();

  React.useEffect(() => {
    storage.getItem(key, setState);
  }, [key]);

  const setValue = React.useCallback(
    async (value: string | null) => {
      setState(value);
      await setStorageItemAsync(key, value);
    },
    [key],
  );

  return [state, setValue];
}
