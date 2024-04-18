import React from "react";
import { Spinner, View } from "tamagui";
import { type PropsWithChildren, useCallback, useEffect } from "react";
import { storage } from "@/utils/storage";
import { useUserStore } from "@/stores/user";
import { useProfile } from "@/hooks/auth/me";

export function AuthProvider({ children }: PropsWithChildren<object>): React.ReactNode {
  const { token, setToken, setIsLoggedIn, setUser, removeToken, removeUser } = useUserStore();
  const { data, status } = useProfile({
    config: {
      enabled: token !== undefined,
      retry: false,
    },
  });

  const loadStorageData = useCallback(async () => {
    const token = await storage.getToken();
    if (token !== null) {
      setToken(token);
      setIsLoggedIn(true);
    } else removeUser();
  }, [removeUser, setIsLoggedIn, setToken]);

  useEffect(() => {
    loadStorageData().catch(console.error);
  }, []);

  useEffect(() => {
    if (status === "error") {
      storage
        .clearToken()
        .then(() => {
          removeUser();
          removeToken();
        })
        .catch(console.error);
    }
  }, [removeToken, removeUser, status]);

  useEffect(() => {
    if (status === "success" && data !== undefined) {
      setUser(data);
    }
  }, [status, data, setUser]);

  if (status === "pending" && token !== undefined) {
    return (
      <View height="100%" width="100%" justifyContent="center" alignItems="center" bg="white">
        <Spinner size="large" />
      </View>
    );
  }

  return children;
}
