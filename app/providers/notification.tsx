import { useCallback, useEffect } from "react";
import { Platform } from "react-native";
import { useTheme } from "tamagui";
import * as Device from "expo-device";
import * as Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { type Notification, useNotificationStore } from "@/stores/notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export function NotificationsProvider(): null {
  const theme = useTheme();
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

  useEffect(() => {
    const currentNotification: Notification | undefined = notifications[0];
    if (typeof currentNotification !== "undefined") {
      dismissNotification(currentNotification.id);
      Notifications.scheduleNotificationAsync({
        trigger: null,
        identifier: currentNotification.id,
        content: {
          title: "Thoth",
          body: currentNotification.content,
          color: getNotificationBackgroundColor(currentNotification.type),
        },
      }).catch(console.error);
    }
  }, [dismissNotification, getNotificationBackgroundColor, notifications]);

  return null;
}
