"use client"
import React, { useState } from "react"
import { FaCut, FaHandHoldingHeart, FaSpa } from "react-icons/fa"
import { FaBars, FaCalendarDays, FaChartLine, FaCreditCard, FaUsers } from "react-icons/fa6"
import SideMenu from "../../layout/SideMenu"
import { MdSpaceDashboard } from "react-icons/md"

const SideMenuImpl = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <React.Fragment>
            <SideMenu title={'SchedulePro'}
                isOpen={isOpen}
                items={[
                    { name: "Dashboard", link: "/", icon: <MdSpaceDashboard /> },
                    { name: "Appointments", link: "/appointments", icon: <FaCalendarDays /> },
                    { name: "Clients", link: "/clients", icon: <FaUsers /> },
                    { name: "Payments", link: "/payments", icon: <FaCreditCard /> },
                    { name: "Reports", link: "/reports", icon: <FaChartLine /> }
                ]}
                services={[
                    { name: "Haircut", link: "/", icon: <FaCut /> },
                    { name: "Massage", link: "/", icon: <FaSpa /> },
                    { name: "Consultation", link: "/", icon: <FaHandHoldingHeart /> }]}
            />
            <button
                className={`absolute top-4 md:visible lg:hidden z-120 p-2 rounded-lg shadow hover:bg-gray-100 ${isOpen ? 'left-52' : 'left-2'}`}
                onClick={() => setIsOpen(!isOpen)}>
                <FaBars className="text-blue-500" />
            </button>
        </React.Fragment>
    )
}

export default SideMenuImpl