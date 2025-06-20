import { useNotificationStore } from '@/stores/useNotificationStore';
import { NotificationItem } from '@/types/NotificationItem';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

/**
 * Schedules a function to be called at a given interval, with the interval
 * determined by the age of the notifications in the given array. The
 * interval will be 5s if any notifications are less than a minute old, 15s
 * if any are between 1 and 5 minutes old, 30s if any are between 5 and 60
 * minutes old, and 120s if all are older than 60 minutes. When the
 * function is called, all expired notifications in the array are removed
 * from the store.
 *
 * @param notifications - The array of notifications
 */
export function useTimeRerender(notifications: NotificationItem[]) {
    const [, setTick] = useState(0);
    const removeNotification = useNotificationStore(state => state.removeNotification);

    useEffect(() => {
        const now = dayjs();

        const intervalMs = notifications.reduce((minInterval, notif) => {
            const ageInMinutes = now.diff(dayjs(notif.timestamp), 'minute');
            let interval = 60000;

            if (ageInMinutes < 1) interval = 5000;
            else if (ageInMinutes < 5) interval = 15000;
            else if (ageInMinutes < 60) interval = 30000;
            else interval = 120000;

            return Math.min(minInterval, interval);
        }, 60000);

        const timer = setInterval(() => {
            const now = Date.now();

            notifications.forEach(notif => {
                if (notif.expiresAt && notif.expiresAt <= now) {
                    removeNotification(notif.id);
                }
            });
            
            setTick(t => t + 1);
        }, intervalMs);

        return () => clearInterval(timer);
    }, [notifications, removeNotification]);
}
