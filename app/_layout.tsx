import React from "react";
import { Slot } from "expo-router";
import { TamaguiProvider } from "@tamagui/core";
import { QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "@/contexts/AuthProvider";
import appConfig from "../tamagui.config";
import { queryClient } from "./libs/react-query";
import { NotificationsProvider } from "./providers/notification";

export default function RootView(): React.JSX.Element | null {
  return (
    <TamaguiProvider config={appConfig}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Slot />
          <NotificationsProvider />
        </AuthProvider>
      </QueryClientProvider>
    </TamaguiProvider>
  );
}
