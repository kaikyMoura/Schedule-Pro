import Image from 'next/image';
import React from 'react';

interface Customer {
    id: string;
    name: string;
    appointmentsCount: number;
    photoUrl: string;
}

interface CustomerListProps {
    customers: Customer[];
    limit?: number;
}

const CustomerList: React.FC<CustomerListProps> = ({ customers, limit = 5 }) => {
    const displayedCustomers = customers.slice(0, limit);

    return (
        <div className="divide-y divide-gray-200">
            {displayedCustomers.map((customer) => (
                <div key={customer.id} className="p-4 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                            <Image
                                src={customer.photoUrl}
                                alt={customer.name}
                                className="object-cover w-full h-full"
                                width={40}
                                height={40}
                            />
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-800">{customer.name}</h4>
                            <p className="text-sm text-gray-500">
                                {customer.appointmentsCount} appointment{customer.appointmentsCount > 1 ? 's' : ''}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CustomerList;