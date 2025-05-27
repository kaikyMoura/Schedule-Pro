'use client'
import Image from "next/image"
import Link from "next/link"
import { ReactNode } from "react"
import { FaPlusCircle } from "react-icons/fa"
import { FaCalendarCheck } from "react-icons/fa6"
import styles from "./SideMenu.module.scss"

interface SideMenuProps {
    title: string,
    items: {
        name: string, link: string, icon: ReactNode, tooltip?: string
    }[],
    services?: {
        name: string, link: string, icon: ReactNode, tooltip?: string
    }[]
    isOpen?: boolean
}

const SideMenu = ({ title, items, services, isOpen }: SideMenuProps) => {

    return (
        <aside
            className={`md:flex md:flex-shrink-0 sticky top-0 left-0 h-screen z-100 ${isOpen ? 'visible' : 'hidden'}`}>
            <div className={`flex flex-col w-(--sidebar-width) border-r border-gray-200 bg-(--component-color) overflow-y-auto z-100`}>
                <div className="flex items-center h-16 px-4 border-b border-gray-200">
                    <div className="flex items-center justify-start w-full ml-2">
                        <FaCalendarCheck className='text-blue-500 text-2xl mr-2' />
                        <span className="text-xl font-semibold text-(--primary-text-color)">{title}</span>
                    </div>
                </div>

                <div className={`flex flex-col flex-grow`}>
                    <nav className="flex-1 px-2 py-4 space-y-1">
                        <ul className="space-y-2">
                            {items.map((item, index) => (
                                <li key={index} className="flex items-center px-4 py-2 text-sm font-medium text-(--secondary-text-color) rounded-md hover:bg-gray-200 group">
                                    <Link href={item.link} className="flex items-center gap-4 w-full"
                                        aria-label={item.name}
                                        data-tooltip-id="my-tooltip"
                                        data-tooltip-content={item.tooltip}>
                                        <i className="text-2xl mr-2">
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
                    <div className="mt-8 flex flex-col flex-grow overflow-y-auto">
                        <h3 className="ml-4 text-sm font-semibold text-gray-400 uppercase">Services</h3>
                        <div className="space-y-1">
                            <nav className={`flex-1 px-2 py-4 space-y-1 ${styles.custom_scrollbar}`}>
                                <ul className="space-y-2">
                                    {services.map((item, index) => (
                                        <li key={index} className="flex items-center px-4 py-2 text-sm font-medium text-(--secondary-text-color) rounded-md hover:bg-gray-200 group">
                                            <Link href={item.link} className="flex items-center gap-4 w-full"
                                                aria-label={item.name}
                                                data-tooltip-id="my-tooltip"
                                                data-tooltip-content={item.tooltip}>
                                                <i className="text-2xl mr-2">
                                                    {item.icon}
                                                </i>
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                    <li className="flex items-center px-4 py-2 text-sm font-medium text-(--tertiary-text-color) rounded-md hover:bg-gray-200 group">
                                        <Link href="/services/new" className="flex items-center gap-4 w-full"
                                            aria-label="Services"
                                            data-tooltip-id="my-tooltip"
                                            data-tooltip-content="Services">
                                            <FaPlusCircle className='text-xl mr-2' />
                                            New Service
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                    </div>
                )
                }

                {/* TODO : Add user profile section */}
                <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center p-1 cursor-pointer hover:bg-(--background) hover:scale-105 rounded-md">
                        <Image
                            className="w-10 h-10 rounded-full"
                            src="https://randomuser.me/api/portraits/women/44.jpg"
                            width={40}
                            height={40}
                            alt="User profile" />
                        <div className="ml-3">
                            <p className="text-sm font-medium text-(--primary-text-color)">Sarah Johnson</p>
                            <p className="text-xs font-medium text-(--tertiary-text-color)">Owner</p>
                        </div>
                    </div>
                </div>
            </div>
        </aside >
    )
}

export default SideMenu