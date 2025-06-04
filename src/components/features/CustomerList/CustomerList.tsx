"use client";
import { User } from '@/types/User';
import Image from 'next/image';
import React from 'react';

interface CustomerListProps {
    customers: User[];
    onSelect?: (customer: User) => void;
    limit?: number;
}

const CustomerList: React.FC<CustomerListProps> = ({ customers, limit, onSelect }) => {
    const displayedCustomers = customers.slice(0, limit);

    return (
        <ul className="divide-y divide-gray-200">
            {displayedCustomers.map((customer) => (
                <li key={customer.id} className="p-4 hover:bg-gray-50 cursor-pointer transition delay-100 duration-300 ease-in-out hover:-translate-y-1 shadow"
                    onClick={() => onSelect!(customer)}>
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                            <Image
                                src={customer.photo ?? "https://randomuser.me/api/portraits/men/1.jpg"}
                                alt={customer.name}
                                className="object-cover w-full h-full"
                                width={40}
                                height={40}
                            />
                        </div>
                        <div>
                            <h4 className="font-medium text-(--primary-text-color)">{customer.name}</h4>
                            {customer.appointments && customer.appointments.length > 0 ? (
                                <p className="text-sm text-(--secondary-text-color)">
                                    {customer.appointments?.length} appointment{customer.appointments?.length > 1 ? 's' : ''}
                                </p>
                            )
                                : (
                                    <p className="text-sm text-(--secondary-text-color)">
                                        No appointments
                                    </p>
                                )}
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default CustomerList;