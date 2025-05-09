'use client'

import { useNotificationSidebar } from '@/components/features/NotificationSidebar/hook'
import ThemeSwitcher from '@/components/features/ThemeSwitcher'
import { useNotificationStore } from '@/stores/useNotificationStore'
import { FaBell } from 'react-icons/fa'
import { FaUser } from 'react-icons/fa6'

const Header = () => {
    const { openOrCloseSidebar } = useNotificationSidebar()
    const { getNotifications } = useNotificationStore()

    const notifications = getNotifications()

    return (
        <header className="bg-(--component-color) shadow-sm sticky top-0 left-0 right-0 z-100 w-full h-16 max-w-full">
            <div className="px-4 py-3 sm:px-6 lg:px-8 flex justify-end items-center">
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
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center p-2">
                            <FaUser className='text-2xl text-blue-500' />
                        </div>
                        <span className="text-sm font-medium text-(--primary-text-color)">Jane</span>
                    </div>
                </div>
            </div>
        </header >
    )
}

export default Header