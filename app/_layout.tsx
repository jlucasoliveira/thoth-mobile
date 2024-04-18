import React from "react";
import { Slot } from "expo-router";
import { AppProvider } from "./providers/app";

export default function RootView(): React.JSX.Element | null {
  return (
    <AppProvider>
      <Slot />
    </AppProvider>
  );
}
