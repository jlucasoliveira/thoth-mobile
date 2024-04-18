import React, { type PropsWithChildren } from "react";
import { TamaguiProvider } from "@tamagui/core";
import { QueryClientProvider } from "@tanstack/react-query";
import { RootSiblingParent } from "react-native-root-siblings";
import AuthProvider from "@/contexts/AuthProvider";
import appConfig from "../../tamagui.config";
import { queryClient } from "../libs/react-query";
import { NotificationsProvider } from "./notification";

export function AppProvider({ children }: PropsWithChildren<object>): React.JSX.Element {
  return (
    <RootSiblingParent>
      <TamaguiProvider config={appConfig}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            {children}
            <NotificationsProvider />
          </AuthProvider>
        </QueryClientProvider>
      </TamaguiProvider>
    </RootSiblingParent>
  );
}
