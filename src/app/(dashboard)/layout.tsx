import { AppSidebar } from "@/components/app-sidebar";
import ChatbotWidget from "@/components/features/ChatbotWidget";
import Header from "@/components/layout/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ChatbotProvider } from "@/contexts/ChatbotContext/ChatbotContext";

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {

    return (
        <SidebarProvider>
            <ChatbotProvider>
                <AppSidebar />
                <main className="flex h-screen w-full overflow-x-hidden">
                    <div className="flex flex-col grow h-screen w-full">
                        <Header />
                        <div className="p-6">
                            {children}
                            <ChatbotWidget />
                        </div>
                    </div>
                </main>
            </ChatbotProvider>
        </SidebarProvider>
    )
}