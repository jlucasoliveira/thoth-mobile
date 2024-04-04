import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import { SplashScreen, Slot } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function App(): React.JSX.Element | null {
  const [hasLoaded, fontError] = useFonts({
    "Inter-Light": require("./assets/fonts/Inter-Light.ttf"),
    "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
    "Inter-Semibold": require("./assets/fonts/Inter-SemiBold.ttf"),
  });

  useEffect(() => {
    if (hasLoaded || fontError instanceof Error) {
      SplashScreen.hideAsync();
    }
  }, [hasLoaded, fontError]);

  if (!hasLoaded && fontError === null) return null;

  return <Slot />;
}
