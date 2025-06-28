"use client";

import { useState, useEffect, ReactNode } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Role } from "@/types/Role";
import { User } from "@/types/User";
import { UserCircle, Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import { Badge } from '@/components/ui/badge';

type ColumnKey = 'photo' | 'name' | 'email' | 'phone' | 'role' | 'lastAppointment' | 'totalAppointments' | 'actions';

interface UsersTableProps {
    users: User[];
    role?: Role;
    limit?: number;
    columns?: ColumnKey[];
    showHeader?: boolean;
}

const DEFAULT_COLUMNS: ColumnKey[] = [
    'photo',
    'name',
    'email',
    'phone',
    'role',
    'lastAppointment',
    'totalAppointments',
    'actions'
];

const columnConfig: Record<ColumnKey, { header: string; cell: (user: User) => ReactNode }> = {
    photo: {
        header: '',
        cell: (user) => (
            <TableCell key={`${user.id}-photo`}>
                {user.photo ? (
                    <Image
                        src={user.photo}
                        alt={user.name}
                        className="object-cover w-14 h-14 rounded-full"
                        width={56}
                        height={56}
                    />
                ) : (
                    <UserCircle className="object-cover w-14 h-14 text-gray-400" />
                )}
            </TableCell>
        )
    },
    name: {
        header: 'Name',
        cell: (user) => <TableCell key={`${user.id}-name`} className="font-medium">{user.name}</TableCell>
    },
    email: {
        header: 'Email',
        cell: (user) => <TableCell key={`${user.id}-email`}>{user.email}</TableCell>
    },
    phone: {
        header: 'Phone',
        cell: (user) => <TableCell key={`${user.id}-phone`}>{user.phone}</TableCell>
    },
    role: {
        header: 'Role',
        cell: (user) => (
            <TableCell key={`${user.id}-role`}>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 capitalize">{user.role}</Badge>
            </TableCell>
        )
    },
    lastAppointment: {
        header: 'Last Appointment',
        cell: (user) => {
            const appointments = user.role === Role.STAFF ? user.staffAppointments : user.appointments;
            const hasAppointments = appointments && appointments.length > 0;
            return (
                <TableCell key={`${user.id}-lastAppointment`} className="text-sm text-gray-600">
                    {hasAppointments ? appointments.at(-1)?.date.toDateString() : "No appointments"}
                </TableCell>
            );
        }
    },
    totalAppointments: {
        header: 'Total Appointments',
        cell: (user) => {
            const appointments = user.role === Role.STAFF ? user.staffAppointments : user.appointments;
            return (
                <TableCell key={`${user.id}-totalAppointments`} className="text-sm text-gray-600">
                    {`${appointments?.length || 0} appointment${appointments?.length !== 1 ? 's' : ''}`}
                </TableCell>
            );
        }
    },
    actions: {
        header: 'Actions',
        cell: (user) => (
            <TableCell key={`${user.id}-actions`} className="text-right">
                <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </TableCell>
        )
    }
};

const UsersTable: React.FC<UsersTableProps> = ({ users, role, limit, columns = DEFAULT_COLUMNS, showHeader = true }) => {
    const [displayedUsers, setDisplayedUsers] = useState<User[]>([]);

    useEffect(() => {
        if (!users || !Array.isArray(users)) {
            setDisplayedUsers([]);
            return;
        }

        let processedUsers = [...users];

        if (role) {
            processedUsers = processedUsers.filter((user) => user.role === role);
        }

        if (limit) {
            processedUsers = processedUsers.slice(0, limit);
        }

        setDisplayedUsers(processedUsers);
    }, [users, role, limit]);

    if (displayedUsers.length === 0) {
        return <div className="p-4 text-center text-gray-500">No users found.</div>;
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {showHeader && (
                        <>
                            {columns.map(key => (
                                <TableHead key={key}>
                                    {columnConfig[key].header}
                                </TableHead>
                            ))}
                        </>
                    )}
                </TableRow>
            </TableHeader>
            <TableBody>
                {displayedUsers.map((user) => (
                    <TableRow key={user.id}>
                        {columns.map(key => columnConfig[key].cell(user))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default UsersTable;