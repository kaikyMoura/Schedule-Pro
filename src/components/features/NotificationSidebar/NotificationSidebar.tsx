"use client";
import { useEffect } from "react";
import { useNotificationSidebar } from "./hook";
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { useTimeRerender } from "@/hooks/useTimeRerender";
import { useNotificationStore } from "@/stores/useNotificationStore";
import { CalendarPlus } from "lucide-react";

dayjs.extend(relativeTime);

const NotificationSidebar = () => {
    const { isOpen } = useNotificationSidebar();
    const store = useNotificationStore.getState();

    const notifications = store.getNotifications();
    useTimeRerender(store.getNotifications());

    useEffect(() => {
        console.log(notifications);
        store.clearExpired();
    }, [notifications, store]);

    return (
        <div className={`bg-card fixed top-15 right-1 h-screen w-80 max-w-full overflow-y-auto rounded-lg shadow-sm p-4 z-50 transition-all duration-300 border ease-in-out ${isOpen ? 'translate-x-0 opacity-100 visible' : 'translate-x-full opacity-0 invisible'}`} >
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-primary">Notifications</h2>
            </div>
            <ul className="space-y-4">
                {notifications.map((notification) => (
                    <li key={notification.id} className="flex bg-(--component-color) rounded-md p-4 hover:bg-blue-200 cursor-pointer transition delay-100 duration-300 ease-in-out hover:-translate-y-1 shadow">
                        <div className="shrink-0">
                            <div className="p-2 rounded-md bg-blue-100 text-blue-600">
                                <CalendarPlus />
                            </div>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-(--primary-text-color)">{notification.title}</p>
                            <p className="text-xs text-(--secondary-text-color)">{notification.message}</p>
                            <p className="text-xs text-(--tertiary-text-color) mt-1">{dayjs(notification.timestamp).fromNow()}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div >
    )
}

export default NotificationSidebar;