'use client'

import { FaBell } from 'react-icons/fa'
import { FaUser } from 'react-icons/fa6'

const Header = () => {

    return (
        <header className="bg-white shadow-sm sticky top-0 left-0 right-0 z-100 w-full h-16 max-w-full">
            <div className="px-4 py-3 sm:px-6 lg:px-8 flex justify-between items-center">
                <div className='flex justify-center w-full'>
                    <h1 className="text-lg font-semibold text-gray-900">
                        DashBoard
                    </h1>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <button
                            aria-label="Notifications"
                            className="p-2 text-gray-500 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 relative"
                        >
                            <FaBell className='text-xl' />
                            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 border border-white"></span>
                        </button>
                    </div>
                    <div className="w-px h-8 bg-gray-200"></div>
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center p-2">
                            <FaUser className='text-2xl text-blue-500' />
                        </div>
                        <span className="text-sm font-medium text-gray-700">Jane</span>
                    </div>
                </div>
            </div>
        </header >
    )
}

export default Header