'use client'

import { useNotificationSidebar } from '@/components/features/NotificationSidebar/hook';
import ThemeSwitcher from '@/components/features/ThemeSwitcher';
import { useNotificationStore } from '@/stores/useNotificationStore';
import Link from 'next/link';
import { useState } from 'react';
import { FaBell, FaCog } from 'react-icons/fa';
import { FaChevronDown, FaUser } from 'react-icons/fa6';
import { MdLogout } from 'react-icons/md';

const Header = () => {
    const { openOrCloseSidebar } = useNotificationSidebar()
    const { getNotifications } = useNotificationStore()

    const notifications = getNotifications()

    const [openSelect, setOpenSelect] = useState(false)

    return (
        <header className="bg-(--component-color) shadow-sm sticky top-0 left-0 right-0 z-100 w-full h-16 max-w-full">
            <div className="px-4 py-2 sm:px-6 lg:px-6 flex justify-end items-center">
                <div className='mr-2'>
                    <ThemeSwitcher />
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <button
                            type="button"
                            aria-label="Notifications"
                            className="p-2 text-(--tertiary-text-color) rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 relative"
                            onClick={openOrCloseSidebar}>
                            <FaBell className='text-xl' />
                            {notifications.length > 0 &&
                                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 border border-white">
                                </span>
                            }
                        </button>
                    </div>
                    <div className="w-px h-8 bg-gray-200"></div>
                    <div className={`flex items-center space-x-2 p-2 cursor-pointer hover:bg-(--background) hover:scale-105 rounded-md ${openSelect ? 'bg-(--secondary-bg)' : ''}`}
                        onClick={() => setOpenSelect(!openSelect)}>
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center p-2">
                            <FaUser className='text-2xl text-blue-500' />
                        </div>
                        <span className="text-sm font-medium text-(--primary-text-color)">{"Sarah Johnson"}</span>
                        <FaChevronDown className='text-lg text-(--secondary-text-color)' />
                    </div>
                    {openSelect &&
                        <div className="absolute top-16 right-0 z-50 w-52 py-2 bg-(--secondary-bg) rounded-md shadow-lg">
                            <Link href="/profile" className="block flex items-center justify-start px-4 py-2 text-sm text-(--primary-text-color) hover:bg-blue-100">
                                <div className="rounded-full flex items-center p-2">
                                    <FaUser className='text-lg' />
                                </div>
                                <p>My Profile</p>
                            </Link>
                            <Link href="/profile" className="block flex items-center justify-start px-4 py-2 text-sm text-(--primary-text-color) hover:bg-blue-100">
                                <div className="rounded-full flex items-center p-2">
                                    <FaCog className='text-lg' />
                                </div>
                                <p>Settings</p>
                            </Link>
                            <Link href="/profile" className="block flex items-center justify-start px-4 py-2 text-sm text-(--primary-text-color) hover:bg-blue-100">
                                <div className='flex items-center gap-1'>
                                    <div className="rounded-full flex items-center p-2">
                                        <MdLogout className='text-lg' />
                                    </div>
                                    Sign out
                                </div>
                            </Link>
                        </div>
                    }
                </div>
            </div>
        </header >
    )
}

export default Header