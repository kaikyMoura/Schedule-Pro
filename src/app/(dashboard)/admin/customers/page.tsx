"use client";
import UsersTable from "@/components/features/UsersTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SearchInput from "@/components/ui/SearchInput";
import { Role } from "@/types/Role";
import { Status } from "@/types/Status";
import { User } from "@/types/User";
import { Users } from "lucide-react";
import { useState } from "react";

const customers: User[] = [
    {
        id: '1',
        name: 'John Smith',
        email: 'john@example.com',
        phone: '123-456-7890',
        photo: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        phone: '987-654-3210',
        photo: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    {
        id: '3',
        name: 'Michael Brown',
        email: 'michael@example.com',
        phone: '555-555-5555',
        photo: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
    {
        id: '4',
        name: 'Emily Davis',
        email: 'emily@example.com',
        phone: '111-222-3333',
        photo: 'https://randomuser.me/api/portraits/women/4.jpg',
        appointments: [
            {
                id: 'e122cbb2-f4f5-4a5c-97ec-d5d53f987a4c',
                date: new Date('2025-06-10'),
                time: '1:00 PM - 1:45 PM',
                notes: 'No notes',
                status: Status.CANCELLED,
                price: 40.00,
                staffId: 'John Doe',
                customerId: 'Emily Davis',
                serviceId: 'haircut',
            },
        ]
    },
    {
        id: '5',
        name: 'Daniel Lee',
        email: 'daniel@example.com',
        phone: '444-555-6666',
        photo: 'https://randomuser.me/api/portraits/men/5.jpg',
        appointments: [
            {
                id: '9d5cfa4f-1f8b-4721-bd14-cf7fcb6e8bb',
                date: new Date('2025-06-01'),
                time: '10:00 AM - 10:45 AM',
                notes: 'No notes',
                status: Status.CONFIRMED,
                price: 45.00,
                staffId: 'John Doe',
                customerId: 'John Smith',
                serviceId: 'haircut',
            },
        ]
    },
    {
        id: '6',
        name: 'Olivia Green',
        email: 'olivia@example.com',
        phone: '777-888-9999',
        photo: 'https://randomuser.me/api/portraits/women/5.jpg',
    },
];

export default function UserManagementPage() {
    // const [searchTerm, setSearchTerm] = useState('');
    // const [isAddUserOpen, setIsAddUserOpen] = useState(false)

    const [filteredData, setFilteredData] = useState<User[]>(customers);
    // const [selectedCustomer, setSelectedCustomer] = useState<User | null>(null);

    const handleFilter = (users: User[]) => {
        setFilteredData(users);
    };


    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-primary">Customer Management</h1>
                    <p className="text-gray-600 mt-2">Manage your customers</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">+2 from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total appointments this month</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">36</div>
                        <p className="text-xs text-muted-foreground">+5 from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg. appointments per customer</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2</div>
                        <p className="text-xs text-muted-foreground">+12% from last month</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Users</CardTitle>
                            <CardDescription>Manage user accounts and their permissions</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <SearchInput label="" placeholder="Search users..." data={customers}
                                    keys={['name', 'email', 'phone']} onSelect={() => { }}
                                    showFilteredList={false} setFilteredList={(users) => handleFilter(users)} />
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <UsersTable users={filteredData} role={Role.CUSTOMER} />
                </CardContent>
            </Card>
        </div>
    )
}