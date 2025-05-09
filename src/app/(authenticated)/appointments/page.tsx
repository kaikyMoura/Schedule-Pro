"use client";

import AppointmentCard from "@/components/features/AppointmentCard";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Modal from "@/components/ui/Modal";
import { Appointment } from "@/types/Appointment";
import { useRouter } from "next/navigation";
import { useState } from "react";

const appointments: Appointment[] = [
    {
        id: '9d5cfa4f-1f8b-4721-bd14-cf7fcb6e8bb',
        type: 'haircut',
        clientName: 'John Smith',
        date: '2025-06-01',
        time: '10:00 AM - 10:45 AM',
        staff: 'John Doe',
        notes: 'No notes',
        status: 'Confirmed',
        price: '$45.00',
    },
    {
        id: '3d3d7d7e-62dc-4429-b749-7756b27eb5d2',
        type: 'massage',
        clientName: 'Alice Johnson',
        date: '2025-06-05',
        time: '2:30 PM - 3:15 PM',
        staff: 'Jane Smith',
        notes: 'Alergic to latex',
        status: 'Pending',
        price: '$60.00',
    },
    {
        id: "49720ec7-9aa0-47ae-a2b5-f503f519e406 ",
        type: 'consultation',
        clientName: 'Bob Lee',
        date: '2025-06-08',
        time: '11:00 AM - 12:00 PM',
        staff: 'Bob Smith',
        notes: 'No notes',
        status: 'Confirmed',
        price: '$30.00',
    },
    {
        id: "e122cbb2-f4f5-4a5c-97ec-d5d53f987a4c ",
        type: 'haircut',
        clientName: 'Emily Davis',
        date: '2025-06-10',
        time: '1:00 PM - 1:45 PM',
        staff: 'John Doe',
        notes: 'No notes',
        status: 'Cancelled',
        price: '$40.00',
    },
];

const Appointments = () => {
    const router = useRouter();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment>();
    const [modalType, setModalType] = useState<'edit' | 'delete'>('edit');


    const handleSelect = (action: string, appointment: Appointment) => {
        setSelectedAppointment(appointment);

        if (action === 'edit') {
            const encodedId = encodeURIComponent(Buffer.from(appointment.id).toString('base64'));
            router.push(`/appointments/edit/${encodedId}`);

        } else if (action === 'delete') {
            setIsModalOpen(true);
            setModalType('delete');
        }

    };

    const handleDelete = () => {
        if (selectedAppointment) {
            const index = appointments.findIndex((appointment) => appointment.id === selectedAppointment.id);
            if (index !== -1) {
                alert(`Appointment ${selectedAppointment.id} deleted successfully`);
            }
        }
        setIsModalOpen(false);
    };

    return (
        <div>
            <Card className="w-full">
                <div className="p-5 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-(--primary-text-color)">Appointments</h3>
                    </div>
                </div>
                {appointments != undefined ?
                    <AppointmentCard appointments={appointments} onSelect={(action, appointment) => handleSelect(action, appointment)} />
                    :
                    <div className="p-4 text-center text-(--tertiary-text-color)">No appointments found</div>
                }
            </Card>

            {isModalOpen && <Modal isModalOpen={isModalOpen} closeModal={() => setIsModalOpen(!isModalOpen)} >
                {modalType === 'delete' &&
                    <div className="max-w-sm mx-auto">
                        <div className="flex flex-col items-center text-center space-y-4">
                            <h3 className="text-lg font-semibold text-(--primary-text-color)">Delete Appointment</h3>
                            <p className="text-sm text-(--secondary-text-color)">
                                Are you sure you want to delete this appointment?
                            </p>
                            <div className="flex justify-between gap-4 mt-4">
                                <Button type="button" style="secondary" text="cancel" action={() => setIsModalOpen(false)} width={160} />
                                <Button className="hover:bg-red-600" type="button" style={
                                    {
                                        type: 'custom',
                                        backgroundColor: '#DC2626',
                                        color: 'text-white'
                                    }
                                } text="delete" action={handleDelete} width={160} />
                            </div>
                        </div>
                    </div>
                }
            </Modal>}
        </div>
    )
}

export default Appointments