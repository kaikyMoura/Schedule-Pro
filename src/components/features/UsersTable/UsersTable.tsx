"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Role } from '@/types/Role';
import { User } from '@/types/User';
import { Edit, Trash2, UserCircle } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface UsersTableProps {
    users: User[];
    role?: Role;
    limit?: number;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, role, limit }) => {
    if (!users || !Array.isArray(users)) {
        return <div>No users found.</div>;
    }
    const displayedUsers = users.slice(0, limit);

    if (role) {
        displayedUsers.filter((user) => user.role === role);
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead></TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Last Appointment</TableHead>
                    <TableHead>Total Appointments</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {displayedUsers.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell>
                            {user.photo ? (
                                <Image
                                    src={user.photo ?? ""}
                                    alt={user.name}
                                    className="object-cover w-16 h-16 rounded-full"
                                    width={90}
                                    height={90} />) :
                                (
                                    <UserCircle
                                        className="object-cover w-16 h-16 rounded-full"
                                    />
                                )
                            }
                        </TableCell>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{user.role}</Badge>
                        </TableCell>
                        {(() => {
                            const appointments = role === Role.STAFF
                                ? user.staffAppointments
                                : user.appointments;

                            const hasAppointments = appointments && appointments.length > 0;

                            return (
                                <>
                                    <TableCell className="text-sm text-gray-600">
                                        {hasAppointments ? (
                                            appointments.at(-1)?.date.toDateString()
                                        ) : (
                                            "No appointments"
                                        )}
                                    </TableCell>

                                    <TableCell className="text-sm text-gray-600">
                                        {`${appointments?.length || 0} appointment${appointments?.length !== 1 ? 's' : ''}`}
                                    </TableCell>
                                </>
                            );
                        })()}
                        <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                                <Button variant="ghost" size="sm">
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table >
    );
};

export default UsersTable;