export type NotificationItem = {
    id: string;
    title: string;
    message: string;
    timestamp: string | Date;
    expiresAt: number;
    type: "error" | "success" | "warning" | "notification";
};