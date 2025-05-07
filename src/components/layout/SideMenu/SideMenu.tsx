'use client'
import Image from "next/image"
import Link from "next/link"
import { ReactNode } from "react"
import { FaBars, FaCalendarCheck } from "react-icons/fa6"
// import styles from "./SideMenu.module.scss"

interface SideMenuProps {
    title: string,
    items: {
        name: string, link: string, icon: ReactNode, tooltip?: string
    }[],
    services?: {
        name: string, link: string, icon: ReactNode, tooltip?: string
    }[]
}

const SideMenu = ({ title, items, services }: SideMenuProps) => {

    return (
        <aside className={`hidden md:flex md:flex-shrink-0 sticky top-0 left-0 h-screen`}>
            <div className={`flex flex-col w-(--sidebar-width) border-r border-gray-200 bg-(--component-color) overflow-y-auto`}>
                <button id="mobile-menu-button" className="sm:visible md:visible lg:hidden absolute top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-lg">
                    <FaBars className="text-blue-500" />
                </button>
                <div className="flex items-center h-16 px-4 border-b border-gray-200">
                    <div className="flex items-center justify-start w-full ml-2">
                        <FaCalendarCheck className='text-blue-500 text-2xl mr-2' />
                        <span className="text-xl font-semibold text-gray-800">{title}</span>
                    </div>
                </div>
                <div className="flex flex-col flex-grow overflow-y-auto custom-scrollbar">
                    <nav className="flex-1 px-2 py-4 space-y-1">
                        <ul className="space-y-2">
                            {items.map((item, index) => (
                                <li key={index} className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-200 group">
                                    <Link href={item.link} className="flex items-center gap-4 w-full"
                                        aria-label={item.name}
                                        data-tooltip-id="my-tooltip"
                                        data-tooltip-content={item.tooltip}>
                                        <i className="text-primary-500 text-2xl mr-2">
                                            {item.icon}
                                        </i>
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                {services && (
                    <div className="mt-8 flex flex-col flex-grow overflow-y-auto custom-scrollbar">
                        <h3 className="ml-4 text-sm font-semibold text-gray-400 uppercase">Services</h3>
                        <div className="space-y-1">
                            <nav className="flex-1 px-2 py-4 space-y-1">
                                <ul className="space-y-2">
                                    {services.map((item, index) => (
                                        <li key={index} className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-200 group">
                                            <Link href={item.link} className="flex items-center gap-4 w-full"
                                                aria-label={item.name}
                                                data-tooltip-id="my-tooltip"
                                                data-tooltip-content={item.tooltip}>
                                                <i className="text-primary-500 text-2xl mr-2">
                                                    {item.icon}
                                                </i>
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>

                    </div>
                )
                }

                {/* TODO : Add user profile section */}
                <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center">
                        <Image
                            className="w-10 h-10 rounded-full"
                            src="https://randomuser.me/api/portraits/women/44.jpg"
                            width={40}
                            height={40}
                            alt="User profile" />
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-700">Sarah Johnson</p>
                            <p className="text-xs font-medium text-gray-500">Owner</p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default SideMenu