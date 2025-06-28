import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/layout/Header";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {

    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex h-screen w-full overflow-x-hidden">
                <div className="flex flex-col grow h-screen w-full">
                    <Header />
                    <div className="p-6">
                        {children}
                    </div>
                </div>
            </main>
        </SidebarProvider>
    )
}