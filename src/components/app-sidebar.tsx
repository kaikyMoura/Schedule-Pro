"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { CalendarCheck, CalendarDays, ChartLine, CreditCard, LayoutDashboard, PlusCircle, Settings, Shield, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type MenuItem = {
    name: string
    link: string
    icon: React.ElementType
    tooltip: string
}

const mainItems: MenuItem[] = [
    { name: "Dashboard", link: "/", icon: LayoutDashboard, tooltip: "Dashboard overview" },
    { name: "Appointments", link: "/appointments", icon: CalendarDays, tooltip: "Manage appointments" },
    { name: "Customers", link: "/customers", icon: Users, tooltip: "Manage customers" },
    { name: "Payments", link: "/payments", icon: CreditCard, tooltip: "Manage payments" },
    { name: "Reports", link: "/reports", icon: ChartLine, tooltip: "View reports" }
]

const adminItems = [
    {
        title: "Staff Management",
        url: "/admin/staffs",
        icon: Users,
    },
    {
        title: "Customer Management",
        url: "/admin/customers",
        icon: Users,
    },
    {
        title: "Document Categories",
        url: "/admin/categories",
        icon: Settings,
    },
    {
        title: "Security Settings",
        url: "/admin/security",
        icon: Shield,
    },
]

const services: MenuItem[] = [
    { name: "Service A", link: "/services/a", icon: CalendarCheck, tooltip: "Service A details" },
    { name: "Service B", link: "/services/b", icon: CalendarCheck, tooltip: "Service B details" },
]

export function AppSidebar() {
    const pathname = usePathname()

    return (
        <Sidebar className="w-(--sidebar-width) border-r bg-sidebar text-sidebar-foreground">
            <SidebarHeader className="border-b border-sidebar-border">
                <div className="flex items-center gap-2">
                    <CalendarCheck className="text-2xl text-primary" />
                    <span className="text-xl font-semibold">Schedule Pro</span>
                </div>
            </SidebarHeader>

            <SidebarContent className="flex flex-col">
                <SidebarGroup>
                    <SidebarGroupLabel>Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {mainItems.map((item) => (
                                <SidebarMenuItem key={item.name}>
                                    <SidebarMenuButton asChild isActive={pathname === item.link}>
                                        <Link href={item.link} title={item.tooltip}>
                                            <item.icon className="h-4 w-4" />
                                            <span>{item.name}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {services && (
                    <SidebarGroup>
                        <SidebarGroupLabel>Services</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {services.map((item) => (
                                    <SidebarMenuItem key={item.name}>
                                        <SidebarMenuButton asChild isActive={pathname === item.link}>
                                            <Link href={item.link} title={item.tooltip}>
                                                <item.icon className="h-4 w-4" />
                                                <span>{item.name}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild isActive={pathname === "/services/new"}>
                                        <Link href="/services/new" title="Create a new service">
                                            <PlusCircle className="h-4 w-4" />
                                            <span>New Service</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                )}
                <SidebarGroup>
                    <SidebarGroupLabel>Administration</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {adminItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                                        <Link href={item.url}>
                                            <item.icon className="h-4 w-4" />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-sidebar-border">
                <div className="flex items-center gap-3">
                    <Image
                        src="https://randomuser.me/api/portraits/women/44.jpg"
                        width={40}
                        height={40}
                        alt="User profile"
                        className="h-10 w-10 rounded-full"
                    />
                    <div>
                        <p className="text-sm font-medium text-sidebar-primary-foreground">Sarah Johnson</p>
                        <p className="text-xs text-sidebar-foreground">Owner</p>
                    </div>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}
