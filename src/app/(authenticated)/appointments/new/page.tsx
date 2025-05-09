"use client";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import DateInput from "@/components/ui/DateInput";
import Modal from "@/components/ui/Modal";
import SearchInput from "@/components/ui/SearchInput";
import { useLoading } from "@/contexts/LoadingContext/useLoading";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { FaChevronDown, FaUser, FaUserPlus } from "react-icons/fa6";
import styles from "./page.module.scss";
import Input from "@/components/ui/Input";

dayjs.extend(customParseFormat);

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

const availableTime = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM"]

interface Service {
    id: string;
    type: string;
    price: number;
    duration: number;
}

const availableServices: Service[] = [
    {
        id: "haircut",
        type: "Haircut",
        price: 45,
        duration: 45
    },
    {
        id: "massage",
        type: "Massage",
        price: 75,
        duration: 60
    },
    {
        id: "consultation",
        type: "Consultation",
        price: 30,
        duration: 30
    }
]

const availableStaff = [
    "Jane Cooper",
    "Michael Scott",
    "Dwight Schrute",
    "Jim Halpert",
]

const CreateAppointment = () => {
    const { setLoading } = useLoading()
    const router = useRouter()

    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [selectedService, setSelectedService] = useState<Service>();
    const [selectedDate, setSelectedDate] = useState<Date>();
    const [selectedTime, setSelectedTime] = useState<string>("");
    const [selectedStaff, setSelectedStaff] = useState<string>("");
    const [notes, setNotes] = useState<string>("");

    const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);

    const [customCustomer, setCustomCustomer] = useState<Customer | null>(null);

    const today = new Date();
    const year = today.getFullYear();
    const day = today.getDate();

    const start = dayjs(selectedTime, 'h:mm A');
    const end = start.add(1, 'hour');

    useEffect(() => {
    }, [setLoading])

    const handleServiceChange = (serviceId: string) => {
        const service = availableServices.find((service) => service.id === serviceId);
        if (service) {
            setSelectedService(service);
        }
    }

    const handleSubmit = async () => {
        if (!selectedCustomer || !selectedService || !selectedDate || !selectedTime || !selectedStaff) {
            alert("Please fill in all fields");
            return;
        }

        setLoading(true)
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false)
    }

    const handleAddCustomCustomer = () => {
        setSelectedCustomer(customCustomer);
        setShowAddCustomerModal(false);

        setCustomCustomer(null);
    }

    return (
        <div className="min-h-screen max-h-screen">
            <Card className="w-full min-h-screen">
                <form className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-lg font-semibold text-(--primary-text-color) mb-4">Appointment Details</h3>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-(--primary-text-color) mb-1">Service</label>
                                <div className="relative">
                                    <select className="block appearance-none cursor-pointer w-full bg-(--component-color) border border-gray-200 text-(--primary-text-color) py-2 px-3 pr-8 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                        defaultValue="Select a service" onChange={(e) => handleServiceChange(e.target.value)}>
                                        <option disabled>Select a service</option>
                                        {availableServices.map((service) => (
                                            <option key={service.id} value={service.id}>{service.type} - ${service.price} ({service.duration} min)</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-(--primary-text-color)">
                                        <FaChevronDown className="text-xs" />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <div className="relative">
                                    <DateInput label="Select a date" value={selectedDate!} onChange={(e) => setSelectedDate(e!)}
                                        minDate={new Date(year, today.getMonth(), day)}
                                        maxDate={new Date(year, 12 - 1, 31 - 1)}
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-(--primary-text-color) mb-1">Time</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {availableTime.map((time, index) => (
                                        <button key={index} type="button"
                                            className={`py-2 px-3 text-sm rounded-md border border-gray-200 text-(--primary-text-color) hover:border-blue-300 focus:outline-none ${time === selectedTime ? "bg-blue-500 text-white" : ""}`}
                                            onClick={() => setSelectedTime(time)}>
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-(--primary-text-color) mb-1">Staff</label>
                                <div className="relative">
                                    <select className="block appearance-none cursor-pointer w-full bg-(--component-color) border border-gray-200 text-(--primary-text-color) py-2 px-3 pr-8 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                        defaultValue="Any available staff" onChange={(e) => setSelectedStaff(e.target.value)}>
                                        <option>Any available staff</option>
                                        {availableStaff.map((staff) => (
                                            <option key={staff} value={staff}>{staff}</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-(--primary-text-color)">
                                        <FaChevronDown className="text-xs" />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-(--primary-text-color) mb-1">Notes</label>
                                <textarea className="block w-full bg-(--component-color) border border-gray-200 text-(--primary-text-color) py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Any special requests or notes..."></textarea>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-(--primary-text-color) mb-4">Customer</h3>

                            <div className="mb-6">
                                <SearchInput data={customers} keys={["name", "email"]}
                                    imageKey={"photoUrl"}
                                    placeholder="Search for a customer..." label={"Search for customers"} onSelect={(customer) => setSelectedCustomer(customer)} />
                            </div>

                            <div className="mb-6">
                                <div className="flex items-center mb-3">
                                    <div className="flex-1 border-t border-gray-200"></div>
                                    <span className="px-3 text-sm text-(--tertiary-text-color)">or</span>
                                    <div className="flex-1 border-t border-gray-200"></div>
                                </div>
                                <button type="button" className="flex items-center justify-center w-full py-2 px-3 border border-dashed border-gray-300 rounded-md text-(--secondary-text-color) hover:text-blue-500 hover:border-blue-300 hover:bg-blue-50"
                                    onClick={() => setShowAddCustomerModal(true)}>
                                    <FaUserPlus className="mr-2" />
                                    <p>Add new customer</p>
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
                                                    <h4 className="font-medium text-(--secondary-text-color)">{customer.name}</h4>
                                                    <p className="text-sm text-(--tertiary-text-color)">{customer.number} • {customer.email}</p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="border-t border-gray-200 pt-4">
                                <h4 className="font-medium text-(--primary-text-color) mb-3">Customer Details</h4>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-xs font-medium text-(--tertiary-text-color) mb-1">First Name</label>
                                        <p className="text-sm text-(--primary-text-color)">{selectedCustomer?.name}</p>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-(--tertiary-text-color) mb-1">Phone</label>
                                        <p className="text-sm text-(--primary-text-color)">{selectedCustomer?.number}</p>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-(--tertiary-text-color) mb-1">Email</label>
                                        <p className="text-sm text-(--primary-text-color)">{selectedCustomer?.email}</p>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-(--tertiary-text-color) mb-1">Last Appointment</label>
                                        <p className="text-sm text-(--primary-text-color)">{selectedCustomer?.lastAppointment}</p>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-xs font-medium text-(--tertiary-text-color) mb-1">Customer Notes</label>
                                    <p className="text-sm text-(--primary-text-color)">{notes}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

                <div className="bg-(--secondary-bg) p-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-(--primary-text-color) mb-4">Appointment Summary</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-(--component-color) p-4 rounded-md border border-gray-200">
                            <h4 className="text-sm font-medium text-(--secondary-text-color) mb-2">Service</h4>
                            <p className="text-(--primary-text-color) text-xl">{selectedService?.type}</p>
                            <p className="text-sm text-(--secondary-text-color)">{selectedService?.duration} minutes</p>
                        </div>
                        <div className="bg-(--component-color) p-4 rounded-md border border-gray-200">
                            <h4 className="text-sm font-medium text-(--secondary-text-color) mb-2">Date & Time</h4>
                            <p className="text-(--primary-text-color) text-xl">{dayjs(selectedDate).format('dddd, MMMM D, YYYY')}</p>
                            <p className="text-sm text-(--secondary-text-color)">{start.format('h:mm A')} - {end.format('h:mm A')}</p>
                        </div>
                        <div className="bg-(--component-color) p-4 rounded-md border border-gray-200">
                            <h4 className="text-sm font-medium text-(--secondary-text-color) mb-2">Staff</h4>
                            <p className="text-(--primary-text-color) text-xl">{selectedStaff}</p>
                        </div>
                        <div className="bg-(--component-color) p-4 rounded-md border border-gray-200">
                            <h4 className="text-sm font-medium text-(--secondary-text-color) mb-2">Price</h4>
                            <p className="text-xl font-semibold text-(--primary-text-color)">${selectedService?.price}</p>
                            <p className="text-sm text-(--secondary-text-color)">Payment due at appointment</p>
                        </div>
                    </div>
                </div>
            </Card>
            <div className="flex justify-between gap-4 mt-4">
                <Button type="button" style="secondary" text="cancel" action={() => router.back()} width={450} />
                <Button type="submit" style="primary" text="create Appointment" action={handleSubmit} width={450} />
            </div>
            {showAddCustomerModal && <Modal isModalOpen={showAddCustomerModal} closeModal={() => setShowAddCustomerModal(!showAddCustomerModal)} >
                <div className="mx-auto p-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="flex items-center space-x-2 border-b border-gray-200 pb-4">
                            <h2><span className="text-2xl font-bold text-(--secondary-text-color)">
                                Create temporary customer
                            </span></h2>
                            <FaInfoCircle className="cursor-pointer text-2xl text-(--secondary-text-color)"
                                data-tooltip-id="my-tooltip"
                                data-tooltip-content={
                                    `⚠️ This is a temporary customer.\n
                                    Their data will not be saved and will only be used for this appointment.\n
                                    If they want to access the application in the future,\n
                                    they will need to create an account.`
                                } />
                        </div>

                        <div className="flex flex-col text-start w-full pt-4 text-md  space-y-2">
                            <Input type="text" label="Name" placeholder="name" value={customCustomer?.name ?? ''}
                                onChange={(e) => setCustomCustomer({ ...customCustomer!, name: e.target.value })} />
                            <Input type="email" label="Email" placeholder="email" value={customCustomer?.email ?? ''}
                                onChange={(e) => setCustomCustomer({ ...customCustomer!, email: e.target.value })} />
                            <Input type="tel" label="Phone Number" placeholder="phone number" value={customCustomer?.number ?? ''}
                                onChange={(e) => setCustomCustomer({ ...customCustomer!, number: e.target.value })} />
                        </div>
                    </div>
                    <div className="flex gap-4 mt-6">
                        <Button type="button" style="secondary" text="cancel" action={() => setShowAddCustomerModal(!showAddCustomerModal)} />
                        <Button type="submit" style="primary" text="create customer" action={handleAddCustomCustomer} />
                    </div>
                </div>

            </Modal>}
        </div>
    )
}

export default CreateAppointment