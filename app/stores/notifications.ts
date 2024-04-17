import { v4 as uuid } from "uuid";
import { create } from "zustand";

export type Notification = {
  id: string;
  type?: "success" | "info" | "warning" | "error";
  content: string;
};

type NotificationStore = {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, "id">) => void;
  dismissNotification: (id: string) => void;
  addNotifications: (notifications: Array<Omit<Notification, "id">>) => void;
  dismissNotifications: (ids: string[]) => void;
};

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  addNotification: (notification) => {
    set((state) => ({
      ...state,
      notifications: [...state.notifications, { id: uuid(), ...notification }],
    }));
  },
  addNotifications: (notifications) => {
    set((state) => ({
      ...state,
      notifications: state.notifications.concat(
        notifications.map((notification) => ({ id: uuid(), ...notification })),
      ),
    }));
  },
  dismissNotification: (id) => {
    set((state) => ({
      ...state,
      notifications: state.notifications.filter((notification) => notification.id !== id),
    }));
  },
  dismissNotifications: (ids) => {
    set((state) => ({
      ...state,
      notifications: state.notifications.filter((notification) => !ids.includes(notification.id)),
    }));
  },
}));
