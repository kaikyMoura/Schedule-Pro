"use client";
import CustomerList from "@/components/features/CustomerList";
import Card from "@/components/ui/Card";
import Modal from "@/components/ui/Modal";
import SearchInput from "@/components/ui/SearchInput";
import { Customer } from "@/types/Customer";
import Image from "next/image";
import { useState } from "react";

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

const Customers = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer>();

    const handleSelect = (customer: Customer) => {
        setSelectedCustomer(customer);
        setIsModalOpen(true);
    };

    return (
        <div>
            <div className="mb-6 sm:w-full md:w-full lg:w-1/2">
                <SearchInput data={customers} keys={["name", "email"]}
                    imageKey={"photoUrl"}
                    placeholder="Search for a customer..." label={"Search for customers"} onSelect={(customer) => handleSelect(customer)} />
            </div>
            <Card className="h-full md:w-full sm:w-full">
                <div className="p-5 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-(--primary-text-color)">Customers</h3>
                    </div>
                </div>
                <CustomerList customers={customers} onSelect={(customer) => handleSelect(customer)} />
            </Card>
            {isModalOpen && <Modal isModalOpen={isModalOpen} closeModal={() => setIsModalOpen(!isModalOpen)} >
                <div className="max-w-sm mx-auto p-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-100 shadow-md">
                            <Image
                                src={selectedCustomer!.photoUrl}
                                alt={selectedCustomer!.name}
                                className="object-cover w-full h-full"
                                width={128}
                                height={128}
                            />
                        </div>
                        <h2 className="text-xl font-bold text-(--primary-text-color)">{selectedCustomer?.name}</h2>

                        <div className="flex flex-col text-start w-full border-t border-gray-200 pt-4 text-md text-(--primary-text-color) space-y-2">
                            <p><span className="font-medium">Email:</span> {selectedCustomer?.email}</p>
                            <p><span className="font-medium">Phone:</span> {selectedCustomer?.number}</p>
                            <p><span className="font-medium">Last Appointment:</span> {selectedCustomer?.lastAppointment}</p>
                            <p><span className="font-medium">Appointments:</span> {selectedCustomer?.appointmentsCount}</p>
                        </div>
                    </div>
                </div>

            </Modal>}
        </div>
    )
}

export default Customers