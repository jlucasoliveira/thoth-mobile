import React from "react";
import { Slot } from "expo-router";
import { TamaguiProvider } from "@tamagui/core";
import AuthProvider from "@/contexts/AuthProvider";
import appConfig from "../tamagui.config";

export default function RootView(): React.JSX.Element | null {
  return (
    <TamaguiProvider config={appConfig}>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </TamaguiProvider>
  );
}
