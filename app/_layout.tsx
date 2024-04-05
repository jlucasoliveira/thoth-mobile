import React from "react";
import { Slot } from "expo-router";
import AuthProvider from "@/contexts/AuthProvider";

export default function RootView(): React.JSX.Element | null {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
