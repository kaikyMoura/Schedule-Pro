import { Appointment } from '@/types/Appointment';
import { AlertCircle, Badge, CheckCircle, Clock, Edit, FileText, Trash } from 'lucide-react';
import React, { useCallback, useEffect } from 'react';
import styles from './AppointmentCard.module.scss';

interface AppointmentCardProps {
    appointments: Appointment[];
    onSelect?: (action: 'edit' | 'delete', appointment: Appointment) => void;
    limit?: number;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointments, onSelect, limit = 5 }) => {
    const displayedAppointments = appointments.slice(0, limit);

    const getStatusBadge = useCallback(async (status: string) => {
        switch (status) {
            case "completed":
                return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
            case "confirmed":
                return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Processing</Badge>
            case "pending":
                return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Needs Review</Badge>
            case "cancelled":
                return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Cancelled</Badge>
            default:
                return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{status}</Badge>
        }
    }, [])

    const getStatusIcon = useCallback(async (status: string) => {
        switch (status) {
            case "completed":
                return <CheckCircle className="h-4 w-4 text-green-600" />
            case "processing":
                return <Clock className="h-4 w-4 text-blue-600" />
            case "validation_required":
                return <AlertCircle className="h-4 w-4 text-yellow-600" />
            default:
                return <FileText className="h-4 w-4 text-gray-600" />
        }
    }, [])

    useEffect(() => {
        console.log(appointments);
    }, [appointments, getStatusBadge, getStatusIcon]);

    return (
        <div className="divide-y divide-gray-200">
            {displayedAppointments.map((appointment) => (
                <div key={appointment.id} className={`cursor-pointer p-4 ${styles.appointment__card} hover:bg-blue-100`}>
                    <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                            <div className="mt-1 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                {getStatusIcon(appointment.serviceId)}
                            </div>
                            <div>
                                <h4 className="font-medium text-(--primary-text-color)">{`${appointment.serviceId} - ${appointment.customerId}`}</h4>
                                <p className="text-sm text-(--tertiary-text-color)">{`${appointment.date.toISOString().split('T')[0]} • ${appointment.time}`}</p>
                                <div className="mt-1 flex items-center space-x-2">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium`}>
                                        {getStatusBadge(appointment.status.toLocaleLowerCase())}
                                    </span>
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                        $ {appointment.price}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <button type="button" className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-full"
                                onClick={() => onSelect?.('edit', appointment)}>
                                <Edit />
                            </button>
                            <button type='button' className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full"
                                onClick={() => onSelect?.('delete', appointment)}>
                                <Trash />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AppointmentCard;