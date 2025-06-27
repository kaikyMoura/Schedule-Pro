import Header from "@/components/layout/Header";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {

    return (
        <SidebarProvider>
            <main className="flex h-screen overflow-x-hidden">
                <div className="flex flex-col flex-grow">
                    <Header />
                    <div className="flex-grow p-14 transition-all duration-500 ease-in-out overflow-y-auto max-w-screen">
                        {children}
                    </div>
                </div>
            </main>
        </SidebarProvider>
    )
}