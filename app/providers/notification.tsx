import { useCallback, useEffect } from "react";
import { Platform } from "react-native";
import { useTheme } from "tamagui";
import * as Device from "expo-device";
import * as Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import Toast from "react-native-root-toast";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { type Notification, useNotificationStore } from "@/stores/notifications";
import { useUpdateOrCreateToken } from "@/hooks/auth/update-token";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export function NotificationsProvider(): null {
  const theme = useTheme();
  const { top } = useSafeAreaInsets();
  const { mutateAsync } = useUpdateOrCreateToken();
  const { notifications, dismissNotification } = useNotificationStore();

  const getNotificationBackgroundColor = useCallback(
    (type: Notification["type"]): string | undefined => {
      if (type === "error") return theme.red7Dark.get() as string;
      if (type === "warning") return theme.yellow10Dark.get() as string;
      if (type === "success") return theme.green8Light.get() as string;
    },
    [theme],
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function registerForPushNotificationsAsync(): Promise<string | undefined> {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.DEFAULT,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: theme.blue11Light.get(),
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Falha ao configurar as notificações, devido à falta de permissão.");
        return;
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: Constants.default.easConfig?.projectId,
        })
      ).data;
    } else {
      alert("É necessário o uso de um dispositivo físico para as notificações Push.");
    }

    return token;
  }

  async function updateExpoToken(): Promise<void> {
    const token = await registerForPushNotificationsAsync();
    if (token !== undefined) {
      await mutateAsync({
        token,
        os: Platform.OS,
        device: Platform.select({ android: Device.modelName, ios: Device.modelId }),
      });
    }
  }

  useEffect(() => {
    updateExpoToken().catch(console.error);
  }, []);

  useEffect(() => {
    const currentNotification: Notification | undefined = notifications[0];
    if (typeof currentNotification !== "undefined") {
      Toast.show(currentNotification.content, {
        shadow: true,
        animation: true,
        backgroundColor: getNotificationBackgroundColor(currentNotification.type),
        textColor: theme.red10Light.get(),
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP + top,
        onHidden: () => {
          dismissNotification(currentNotification.id);
        },
      });
    }
  }, [dismissNotification, getNotificationBackgroundColor, notifications, theme]);

  return null;
}
