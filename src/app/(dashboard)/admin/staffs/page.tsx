"use client"

import UsersTable from "@/components/features/UsersTable"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Role } from "@/types/Role"
import { Status } from "@/types/Status"
import { User } from "@/types/User"
import { Plus, Search, Shield, Users } from "lucide-react"
import { useState } from "react"

const users: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '123-456-7890',
    photo: 'https://randomuser.me/api/portraits/men/1.jpg',
    role: Role.STAFF,
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '987-654-3210',
    photo: 'https://randomuser.me/api/portraits/women/2.jpg',
    role: Role.STAFF
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael@example.com',
    phone: '555-555-5555',
    photo: 'https://randomuser.me/api/portraits/men/3.jpg',
    role: Role.STAFF
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily@example.com',
    phone: '111-222-3333',
    photo: 'https://randomuser.me/api/portraits/women/4.jpg',
    role: Role.STAFF,
    staffAppointments: [
      {
        id: 'e122cbb2-f4f5-4a5c-97ec-d5d53f987a4c',
        date: new Date('2025-06-10'),
        time: '1:00 PM - 1:45 PM',
        notes: 'No notes',
        status: Status.CANCELLED,
        price: 45.00,
        staffId: 'John Doe',
        customerId: 'Emily Davis',
        serviceId: 'haircut',
      },
      {
        id: '49720ec7-9aa0-47ae-a2b5-f503f519e406',
        date: new Date('2025-06-08'),
        time: '11:00 AM - 12:00 PM',
        notes: 'No notes',
        status: Status.CONFIRMED,
        price: 45.00,
        staffId: 'Bob Smith',
        customerId: 'Bob Lee',
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
    role: Role.STAFF,
    staffAppointments: [
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
    role: Role.STAFF,
    staffAppointments: [
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
];


export default function StaffManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)

  // const [selectedCustomer, setSelectedCustomer] = useState<User>();

  // const handleSelect = (customer: User) => {
  //   setSelectedCustomer(customer);
  // };


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Staff Management</h1>
          <p className="text-gray-600 mt-2">Manage your staff members</p>
        </div>
        <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Staff Member</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" className="col-span-3" placeholder="name" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" type="email" className="col-span-3" placeholder="email@example.com" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input id="phone" type="tel" className="col-span-3" placeholder="123-456-7890" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddUserOpen(false)}>Create User</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total staff members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Administrators</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">25% of active users</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Documents/User</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">136</div>
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
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <UsersTable users={users} role={Role.STAFF} />
        </CardContent>
      </Card>
    </div>
  )
}
