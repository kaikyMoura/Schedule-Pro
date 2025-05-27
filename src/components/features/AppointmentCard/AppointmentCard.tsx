import { Appointment } from '@/types/Appointment';
import React, { useCallback, useEffect } from 'react';
import { FaCut, FaEdit, FaSpa, FaTrash } from 'react-icons/fa';
import { FaHandHoldingHeart } from 'react-icons/fa6';
import styles from './AppointmentCard.module.scss';

interface AppointmentCardProps {
    appointments: Appointment[];
    onSelect?: (action: 'edit' | 'delete', appointment: Appointment) => void;
    limit?: number;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointments, onSelect, limit = 5 }) => {
    const displayedAppointments = appointments.slice(0, limit);

    const getIconForType = useCallback((serviceId: string) => {
        switch (serviceId) {
            case 'haircut':
                return <FaCut className="text-2xl text-blue-500" />;
            case 'massage':
                return <FaSpa className="text-2xl text-purple-500" />;
            case 'consultation':
                return <FaHandHoldingHeart className="text-2xl text-pink-500" />;
            default:
                return <FaCut className="text-2xl text-blue-500" />;
        }
    }, []);

    const getColor = useCallback((status: string) => {
        switch (status) {
            case 'PENDING':
                return 'bg-yellow-100 text-orange-600';
            case 'CONFIRMED':
                return 'bg-blue-100 text-blue-800';
            case 'COMPLETED':
                return 'bg-green-100 text-green-600';
            case 'CANCELLED':
                return 'bg-red-100 text-red-600';
            default:
                return 'bg-gray-100 text-(--secondary-text-color)';
        }
    }, []);

    useEffect(() => {
        console.log(appointments);
    }, [appointments, getColor, getIconForType]);

    return (
        <div className="divide-y divide-gray-200">
            {displayedAppointments.map((appointment) => (
                <div key={appointment.id} className={`cursor-pointer p-4 ${styles.appointment__card} hover:bg-blue-100`}>
                    <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                            <div className="mt-1 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                {getIconForType(appointment.serviceId)}
                            </div>
                            <div>
                                <h4 className="font-medium text-(--primary-text-color)">{`${appointment.serviceId} - ${appointment.customerId}`}</h4>
                                <p className="text-sm text-(--tertiary-text-color)">{`${appointment.date.toISOString().split('T')[0]} • ${appointment.time}`}</p>
                                <div className="mt-1 flex items-center space-x-2">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getColor(appointment.status)}`}>
                                        {appointment.status}
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
                                <FaEdit />
                            </button>
                            <button type='button' className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full"
                                onClick={() => onSelect?.('delete', appointment)}>
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AppointmentCard;