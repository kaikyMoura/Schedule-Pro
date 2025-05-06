import React from "react"
import { FaCut, FaHandHoldingHeart, FaSpa } from "react-icons/fa"
import { FaCalendarDays, FaChartLine, FaCreditCard, FaUsers } from "react-icons/fa6"
import SideMenu from "../ui/SideMenu"
import { MdSpaceDashboard } from "react-icons/md"

const SideMenuImpl = () => {

    return (
        <React.Fragment>
            <SideMenu title={'SchedulePro'}
                items={[
                    { name: "Dashboard", link: "/", icon: <MdSpaceDashboard  /> },
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
        </React.Fragment>
    )
}

export default SideMenuImpl