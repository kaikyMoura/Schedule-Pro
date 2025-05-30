import SideMenuImpl from "@/components/features/SideMenuImpl";
import Header from "@/components/layout/Header";

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className="flex h-screen overflow-x-hidden">
            <SideMenuImpl />

            <div className="flex flex-col flex-grow">
                <Header />
                <div className="flex-grow p-14 transition-all duration-500 ease-in-out overflow-y-auto max-w-screen">
                    {children}
                </div>
            </div>
        </div >
    )
}