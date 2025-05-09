"use client";
import NotificationSidebar from "@/components/features/NotificationSidebar";
import { createContext, ReactNode, useState } from "react";

interface NotificationSidebarContextProps {
    isOpen: boolean;
    openOrCloseSidebar: () => void;
}

const NotificationSidebarContext = createContext<NotificationSidebarContextProps | null>(null);


const NotificationSidebarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);


    const openOrCloseSidebar = () => setIsOpen(!isOpen);

    return (
        <NotificationSidebarContext.Provider value={{ isOpen, openOrCloseSidebar }}>
            {children}
            {isOpen && <NotificationSidebar />}
        </NotificationSidebarContext.Provider>
    );
};

export { NotificationSidebarContext, NotificationSidebarProvider };

