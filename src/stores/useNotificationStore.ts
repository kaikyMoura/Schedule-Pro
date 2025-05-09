import { NotificationItem } from '@/types/NotificationItem';
import dayjs from 'dayjs';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type NotificationType = 'error' | 'success' | 'warning' | 'notification';

interface NotificationStore {
  notifications: NotificationItem[];
  addNotification: (title: string, message: string, type: NotificationItem['type'], ttl?: number) => void;
  removeNotification: (id: string) => void;
  clearExpired: () => void;
  getNotifications: () => NotificationItem[];
}

export const useNotificationStore = create<NotificationStore>()(
  persist(
    (set, get) => ({
      notifications: [],

      /**
       * Adds a new notification to the store.
       *
       * @param title - The title of the notification.
       * @param message - The message content of the notification.
       * @param type - The type of the notification, indicating its importance or category.
       * @param ttl - Time to live in milliseconds for the notification. Defaults to 600,000 ms (10 minutes).
       */
      addNotification: (title: string, message: string, type: NotificationType, ttl = 600_000 * 10) => {
        const now = Date.now();
        const newNotification: NotificationItem = {
          id: crypto.randomUUID(),
          title,
          message,
          type,
          timestamp: dayjs().toISOString(),
          expiresAt: now + ttl,
        };

        set({ notifications: [...get().notifications, newNotification] });
      },

      removeNotification: (id) => {
        set({ notifications: get().notifications.filter(n => n.id !== id) });
      },

      clearExpired: () => {
        const now = Date.now();
        set({ notifications: get().notifications.filter(n => !n.expiresAt || n.expiresAt > now) });
      },

      getNotifications: () => get().notifications,
    }),
    {
      name: 'notification-storage',
    }
  )
);