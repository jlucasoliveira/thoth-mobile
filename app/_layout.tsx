import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import { SplashScreen, Slot } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function App(): React.JSX.Element | null {
  const [hasLoaded, fontError] = useFonts({
    InterLight: require("../assets/fonts/Inter-Light.ttf"),
    InterRegular: require("../assets/fonts/Inter-Regular.ttf"),
    InterSemibold: require("../assets/fonts/Inter-SemiBold.ttf"),
  });

  useEffect(() => {
    if (hasLoaded || fontError instanceof Error) {
      SplashScreen.hideAsync();
    }
  }, [hasLoaded, fontError]);

  if (!hasLoaded && fontError === null) return null;

  return <Slot />;
}
