"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DateInput from "@/components/ui/DateInput";
import { useLoading } from "@/contexts/LoadingContext/useLoading";
import { usePopup } from "@/contexts/PopupContext/usePopup";
import { useNotificationStore } from "@/stores/useNotificationStore";
import { Appointment } from "@/types/Appointment";
import { ServiceItem } from "@/types/ServiceItem";
import { Status } from "@/types/Status";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { ArrowDown } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

dayjs.extend(customParseFormat);

const availableTime = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM"]

const availableServices: ServiceItem[] = [
    {
        id: "haircut",
        type: "Haircut",
        price: 45,
        duration: 45
    },
    {
        id: "massage",
        type: "Massage",
        price: 75,
        duration: 60
    },
    {
        id: "consultation",
        type: "Consultation",
        price: 30,
        duration: 30
    }
]

const availableStaff = [
    "Jane Cooper",
    "Michael Scott",
    "Dwight Schrute",
    "Jim Halpert",
]

const appointments: Appointment[] = [
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
    {
        id: '3d3d7d7e-62dc-4429-b749-7756b27eb5d2',
        date: new Date('2025-06-05'),
        time: '2:30 PM - 3:15 PM',
        notes: 'Alergic to latex',
        status: Status.PENDING,
        price: 60.00,
        staffId: 'Jane Smith',
        customerId: 'Alice Johnson',
        serviceId: 'massage',
    },
    {
        id: '49720ec7-9aa0-47ae-a2b5-f503f519e406',
        date: new Date('2025-06-08'),
        time: '11:00 AM - 12:00 PM',
        notes: 'No notes',
        status: Status.CONFIRMED,
        price: 30.00,
        staffId: 'Bob Smith',
        customerId: 'Bob Lee',
        serviceId: 'consultation',
    },
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
];

const EditAppointment = () => {
    const { showPopup } = usePopup();

    const handleOpenPopup = () => {
        showPopup({
            title: "Update appointment",
            message: "Are you sure you want to update this customer?",
            type: "notification",
            actionsPopup: true,
            action: handleSubmit,
        });
    };

    const { addNotification } = useNotificationStore();

    const handleOpenNotification = () => {
        addNotification("Appointment updated", "an appointment has been updated", "notification");
    };
    const { setLoading } = useLoading()
    const router = useRouter()
    const params = useParams();
    const encodedId = params?.id;

    const [selectedService, setSelectedService] = useState<ServiceItem>();
    const [selectedDate, setSelectedDate] = useState<Date>();
    const [selectedTime, setSelectedTime] = useState<string>("");
    const [selectedStaff, setSelectedStaff] = useState<string>("");
    const [notes, setNotes] = useState<string>("");

    const today = new Date();
    const year = today.getFullYear();
    const day = today.getDate();

    const start = dayjs(selectedTime, 'h:mm A');
    const end = start.add(1, 'hour');

    const fecthAppointment = useCallback(async () => {
        if (!availableServices.length || !encodedId) return;
        const decodedId = Buffer.from(decodeURIComponent(encodedId as string), 'base64').toString('utf-8');

        const appointment = appointments.find((appointment) => appointment.id === decodedId);
        console.log(appointment)

        if (appointment) {
            setSelectedService(availableServices.find((service) => service.id === appointment.serviceId));
            setSelectedDate(new Date(appointment.date));
            setSelectedTime(appointment.time);
            setSelectedStaff(appointment.staffId);
            setNotes(appointment.notes);
        }
    }, [encodedId]);

    useEffect(() => {
        fecthAppointment();
    }, [encodedId, fecthAppointment]);

    const handleServiceChange = (serviceId: string) => {
        const service = availableServices.find((service) => service.id === serviceId);
        if (service) {
            setSelectedService(service);
        }
    }

    const handleSubmit = async () => {
        if (!selectedService || !selectedDate || !selectedTime || !selectedStaff) {
            alert("Please fill in all fields");
            return;
        }
        handleOpenNotification()

        setLoading(true)
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false)
        showPopup({
            title: "Appointment Updated Successfully",
            type: "success",
            actionsPopup: true,
            action: handleSubmit,
        });
    }

    if (!encodedId) {
        return (
            <div className="min-h-screen max-h-screen">
                <Card className="w-full min-h-screen">
                    <div className="p-6">
                        <h3 className="text-lg font-semibold text-(--primary-text-color) mb-4">Appointment not found</h3>
                    </div>
                </Card>
            </div>
        )
    }
    else {
        return (
            <div className="min-h-screen max-h-screen">
                <Card className="flex sm:flex-col md:flex-col lg:flex-row min-h-screen">
                    <form className="p-6">
                        <div className="grid grid-cols-2 gap-6">
                            <h3 className="text-lg font-semibold text-(--primary-text-color) mb-4">
                                Edit Appointment Details
                            </h3>
                            <div className="col-start-1 mb-6">
                                <label className="block text-sm font-medium text-(--primary-text-color) mb-1">Service</label>
                                <div className="relative">
                                    <select className="block appearance-none cursor-pointer w-full 
                                    bg-(--component-color) border border-gray-200 text-(--primary-text-color) py-2 px-3 pr-8 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                        defaultValue={
                                            selectedService
                                                ? `${selectedService.type} - ${selectedService.price} 
                                            (${selectedService.duration} min)`
                                                : ''} onChange={(e) => handleServiceChange(e.target.value)}>
                                        <option disabled>Select a service</option>
                                        {availableServices.map((service) => (
                                            <option key={service.id} value={service.id}>{service.type} - ${service.price} ({service.duration} min)</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-(--primary-text-color)">
                                        <ArrowDown className="text-xs" />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <div className="relative">
                                    <DateInput label="Select a date" value={selectedDate!} onChange={(e) => setSelectedDate(e!)}
                                        minDate={new Date(year, today.getMonth(), day)}
                                        maxDate={new Date(year, 12 - 1, 31 - 1)}
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-(--primary-text-color) mb-1">Time</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {availableTime.map((time, index) => (
                                        <button key={index} type="button"
                                            className={`py-2 px-3 text-sm rounded-md border border-gray-200 text-(--primary-text-color) hover:border-blue-300 focus:outline-none ${time === selectedTime ? "bg-blue-500 text-white" : ""}`}
                                            onClick={() => setSelectedTime(time)}>
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-(--primary-text-color) mb-1">Staff</label>
                                <div className="relative">
                                    <select className="block appearance-none cursor-pointer w-full bg-(--component-color) border border-gray-200 text-(--primary-text-color) py-2 px-3 pr-8 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                        defaultValue="Any available staff" onChange={(e) => setSelectedStaff(e.target.value)}>
                                        <option>Any available staff</option>
                                        {availableStaff.map((staff) => (
                                            <option key={staff} defaultValue={staff}>{staff}</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-(--primary-text-color)">
                                        <ArrowDown className="text-xs" />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-(--primary-text-color) mb-1">Notes</label>
                                <textarea className="block w-full bg-(--component-color) border border-gray-200 text-(--primary-text-color) py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Any special requests or notes..."></textarea>
                            </div>
                        </div>
                    </form>

                    <div className="bg-(--secondary-bg) p-6 border-t border-gray-200">
                        <h3 className="text-lg font-semibold text-(--primary-text-color) mb-4">Appointment Summary</h3>
                        <div className="flex flex-col gap-6">
                            <div className="bg-(--component-color) p-4 rounded-md border border-gray-200">
                                <h4 className="text-sm font-medium text-(--secondary-text-color) mb-2">Service</h4>
                                <p className="text-(--primary-text-color) text-xl">{selectedService?.type}</p>
                                <p className="text-sm text-(--secondary-text-color)">{selectedService?.duration} minutes</p>
                            </div>
                            <div className="bg-(--component-color) p-4 rounded-md border border-gray-200">
                                <h4 className="text-sm font-medium text-(--secondary-text-color) mb-2">Date & Time</h4>
                                <p className="text-(--primary-text-color) text-xl">{dayjs(selectedDate).format('dddd, MMMM D, YYYY')}</p>
                                <p className="text-sm text-(--secondary-text-color)">{start.format('h:mm A')} - {end.format('h:mm A')}</p>
                            </div>
                            <div className="bg-(--component-color) p-4 rounded-md border border-gray-200">
                                <h4 className="text-sm font-medium text-(--secondary-text-color) mb-2">Staff</h4>
                                <p className="text-(--primary-text-color) text-xl">{selectedStaff}</p>
                            </div>
                            <div className="bg-(--component-color) p-4 rounded-md border border-gray-200">
                                <h4 className="text-sm font-medium text-(--secondary-text-color) mb-2">Price</h4>
                                <p className="text-xl font-semibold text-(--primary-text-color)">${selectedService?.price}</p>
                                <p className="text-sm text-(--secondary-text-color)">Payment due at appointment</p>
                            </div>
                        </div>
                    </div>
                </Card>
                <div className="flex justify-center gap-4 mt-4 ">
                    <Button type="button" variant={"secondary"} onClick={() => router.back()}>Cancel</Button>
                    <Button type="submit" variant={"default"} onClick={handleOpenPopup}>Save</Button>
                </div>
            </div >
        )
    }
}

export default EditAppointment;