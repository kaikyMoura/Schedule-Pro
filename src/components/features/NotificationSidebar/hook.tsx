import { useContext } from "react";
import { NotificationSidebarContext } from "./context";

export const useNotificationSidebar = () => {
    const context = useContext(NotificationSidebarContext);
    if (!context) throw new Error("useNotificationSidebar must be used within NotificationSidebarProvider");
    return context;
};