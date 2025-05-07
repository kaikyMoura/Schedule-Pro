"use client";

import Card from "@/components/ui/Card";
import DateInput from "@/components/ui/DateInput";
import SearchInput from "@/components/ui/SearchInput";
import { useLoading } from "@/contexts/LoadingContext/useLoading";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa6";
import styles from "./page.module.scss";

interface Customer {
    id: string;
    name: string;
    email: string;
    number: string;
    lastAppointment?: string;
    appointmentsCount: number;
    photoUrl: string;
}

const customers: Customer[] = [
    {
        id: '1',
        name: 'John Smith',
        email: 'john@example.com',
        number: '123-456-7890',
        lastAppointment: "May 25, 2023 - Haircut",
        appointmentsCount: 3,
        photoUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        number: '987-654-3210',
        lastAppointment: "May 27, 2023 - Massage",
        appointmentsCount: 2,
        photoUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    {
        id: '3',
        name: 'Michael Brown',
        email: 'michael@example.com',
        number: '555-555-5555',
        lastAppointment: "May 28, 2023 - Massage",
        appointmentsCount: 5,
        photoUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
    {
        id: '4',
        name: 'Emily Davis',
        email: 'emily@example.com',
        number: '111-222-3333',
        lastAppointment: "May 29, 2023 - Haircut",
        appointmentsCount: 1,
        photoUrl: 'https://randomuser.me/api/portraits/women/4.jpg',
    },
    {
        id: '5',
        name: 'Daniel Lee',
        email: 'daniel@example.com',
        number: '444-555-6666',
        lastAppointment: "March 30, 2023 - Massage",
        appointmentsCount: 4,
        photoUrl: 'https://randomuser.me/api/portraits/men/5.jpg',
    },
    {
        id: '6',
        name: 'Olivia Green',
        email: 'olivia@example.com',
        number: '777-888-9999',
        lastAppointment: "March 15, 2023 - Haircut",
        appointmentsCount: 6,
        photoUrl: 'https://randomuser.me/api/portraits/women/5.jpg',
    },
];

const CreateAppointment = () => {
    const { isLoading, setLoading } = useLoading()
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

    useEffect(() => {
    }, [setLoading])

    return (
        <Card>
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Appointment Details</h3>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                            <div className="relative">
                                <select className="block appearance-none w-full bg-gray-50 border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    defaultValue="Select a service">
                                    <option>Select a service</option>
                                    <option>Haircut - $45 (45 min)</option>
                                    <option>Massage - $75 (60 min)</option>
                                    <option>Consultation - $30 (30 min)</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <i className="fas fa-chevron-down text-xs"></i>
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <div className="relative">
                                <DateInput label="Select a date" value={new Date("2023-01-01")} onChange={() => { }}
                                    minDate={new Date("2023-01-01")}
                                    maxDate={new Date("2025-12-31")}
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                            <div className="grid grid-cols-3 gap-2">
                                <button className="time-slot py-2 px-3 text-sm rounded-md border border-gray-200 text-gray-700 hover:border-blue-300">
                                    9:00 AM
                                </button>
                                <button className="time-slot py-2 px-3 text-sm rounded-md border border-gray-200 text-gray-700 hover:border-blue-300">
                                    9:30 AM
                                </button>
                                <button className="time-slot py-2 px-3 text-sm rounded-md border border-gray-200 text-gray-700 hover:border-blue-300">
                                    10:00 AM
                                </button>
                                <button className="time-slot py-2 px-3 text-sm rounded-md border border-gray-200 text-gray-700 hover:border-blue-300">
                                    10:30 AM
                                </button>
                                <button className="time-slot py-2 px-3 text-sm rounded-md border border-gray-200 text-gray-700 hover:border-blue-300">
                                    11:00 AM
                                </button>
                                <button className="time-slot py-2 px-3 text-sm rounded-md border border-gray-200 text-gray-700 hover:border-blue-300">
                                    11:30 AM
                                </button>
                                <button className="time-slot py-2 px-3 text-sm rounded-md border border-gray-200 text-gray-700 hover:border-blue-300">
                                    1:00 PM
                                </button>
                                <button className="time-slot py-2 px-3 text-sm rounded-md border border-gray-200 text-gray-700 hover:border-blue-300">
                                    1:30 PM
                                </button>
                                <button className="time-slot py-2 px-3 text-sm rounded-md border border-blue-300 bg-blue-50 text-blue-700">
                                    2:00 PM
                                </button>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Staff</label>
                            <div className="relative">
                                <select className="block appearance-none w-full bg-gray-50 border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    defaultValue="Any available staff">
                                    <option>Any available staff</option>
                                    <option>Jane Cooper</option>
                                    <option>Michael Scott</option>
                                    <option>Sarah Johnson</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <i className="fas fa-chevron-down text-xs"></i>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                            <textarea className="block w-full bg-gray-50 border border-gray-200 text-gray-700 py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" rows={3} placeholder="Any special requests or notes..."></textarea>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Customer</h3>

                        <div className="mb-6">
                            <SearchInput data={customers} keys={["name", "email"]}
                                imageKey={"photoUrl"}
                                placeholder="Search for a customer..." label={"Search for customers"} />
                        </div>

                        <div className="mb-6">
                            <div className="flex items-center mb-3">
                                <div className="flex-1 border-t border-gray-200"></div>
                                <span className="px-3 text-sm text-gray-500">or</span>
                                <div className="flex-1 border-t border-gray-200"></div>
                            </div>
                            <button className="w-full py-2 px-3 border border-dashed border-gray-300 rounded-md text-gray-500 hover:text-blue-500 hover:border-blue-300 hover:bg-blue-50">
                                <i className="fas fa-user-plus mr-2"></i> Add new customer
                            </button>
                        </div>

                        <div className="space-y-3 mb-6">
                            <ul>
                                {customers.map((customer) => (
                                    <li key={customer.id}
                                        className={`${styles.customer__card} p-4 border border-gray-200 rounded-md cursor-pointer hover:bg-blue-50 hover:border-blue-300 ${selectedCustomer?.id === customer.id ? 'bg-blue-50 focus:border-blue-300' : ''}`}
                                        onClick={() => setSelectedCustomer(customer)}>
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 rounded-full overflow-hidden">
                                                {customer.photoUrl ?
                                                    <Image
                                                        src={customer.photoUrl}
                                                        alt={customer.name}
                                                        className="object-cover w-full h-full"
                                                        width={40}
                                                        height={40} />
                                                    :
                                                    <FaUser className="object-cover w-full h-full text-blue-500" />
                                                }
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-800">{customer.name}</h4>
                                                <p className="text-sm text-gray-500">{customer.number} • {customer.email}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="border-t border-gray-200 pt-4">
                            <h4 className="font-medium text-gray-800 mb-3">Customer Details</h4>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">First Name</label>
                                    <p className="text-sm text-gray-800">{selectedCustomer?.name}</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Phone</label>
                                    <p className="text-sm text-gray-800">{selectedCustomer?.number}</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
                                    <p className="text-sm text-gray-800">{selectedCustomer?.email}</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Last Appointment</label>
                                    <p className="text-sm text-gray-800">{selectedCustomer?.lastAppointment}</p>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-xs font-medium text-gray-500 mb-1">Customer Notes</label>
                                <p className="text-sm text-gray-800">Prefers evening appointments when possible. Allergic to lavender.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 p-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Appointment Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-4 rounded-md border border-gray-200">
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Service</h4>
                        <p className="text-gray-800">Massage</p>
                        <p className="text-sm text-gray-500">60 minutes</p>
                    </div>
                    <div className="bg-white p-4 rounded-md border border-gray-200">
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Date & Time</h4>
                        <p className="text-gray-800">June 15, 2023</p>
                        <p className="text-sm text-gray-500">2:00 PM - 3:00 PM</p>
                    </div>
                    <div className="bg-white p-4 rounded-md border border-gray-200">
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Price</h4>
                        <p className="text-2xl font-semibold text-gray-800">$75.00</p>
                        <p className="text-sm text-gray-500">Payment due at appointment</p>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default CreateAppointment