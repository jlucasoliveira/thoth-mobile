/* eslint-disable @typescript-eslint/no-floating-promises */
import React from "react";
import { useFonts } from "expo-font";
import { Redirect, SplashScreen } from "expo-router";
import { useAuth } from "@/contexts/AuthProvider";
import { View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function AppLayout(): React.JSX.Element | null {
  const { isLoading, isAuthenticated } = useAuth();
  const [hasLoaded, fontError] = useFonts({
    InterLight: require("../../assets/fonts/Inter-Light.ttf"),
    InterRegular: require("../../assets/fonts/Inter-Regular.ttf"),
    InterSemibold: require("../../assets/fonts/Inter-SemiBold.ttf"),
  });

  React.useEffect(() => {
    if (hasLoaded || fontError instanceof Error || isLoading) {
      SplashScreen.hideAsync();
    }
  }, [hasLoaded, fontError, isLoading]);

  if (!hasLoaded && fontError === null) return null;

  if (!isLoading && !isAuthenticated) return <Redirect href="/(auth)/login" />;

  return <View />;
}
