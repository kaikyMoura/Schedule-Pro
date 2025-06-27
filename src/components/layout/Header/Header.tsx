"use client"

import { useNotificationSidebar } from '@/components/features/NotificationSidebar/hook'
import { useNotificationStore } from '@/stores/useNotificationStore'
import Link from 'next/link'

import { Bell, Cog, LogOut, User as UserIcon } from 'lucide-react'

import ThemeSwitcher from '@/components/features/ThemeSwitcher'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'

export function Header() {
  const { openOrCloseSidebar } = useNotificationSidebar()
  const { notifications } = useNotificationStore()

  const user = {
    name: "Sarah Johnson",
    email: "sarah.j@dokra.com",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  }

  return (
    <header className="sticky top-0 z-50 h-full w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex justify-between items-center w-full h-16 gap-4 px-4 sm:px-6">
        <div className='flex justify-start'>
          <SidebarTrigger />
        </div>
        <div className="flex justify-end items-center gap-2">
          <ThemeSwitcher />
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Notifications"
              onClick={openOrCloseSidebar}
            >
              <Bell className="h-5 w-5" />
            </Button>
            {notifications.length > 0 && (
              <span className="absolute right-1 top-1 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500"></span>
              </span>
            )}
          </div>

          <Separator orientation="vertical" className="h-8" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem className='cursor-pointer' asChild>
                  <Link href="/profile">
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>My profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className='cursor-pointer' asChild>
                  <Link href="/settings">
                    <Cog className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuItem className='cursor-pointer'>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

export default Header;