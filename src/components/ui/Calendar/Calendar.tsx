import React from 'react';
import dayjs from 'dayjs';
import { FaChevronDown, FaChevronLeft, FaChevronRight, FaPlus } from 'react-icons/fa6';
import styles from './Calendar.module.scss';

interface Appointment {
    id: string;
    type: string;
    clientName: string;
    date: string;
    time: string;
    status: string;
    price: string;
}

interface CalendarProps {
    appointments: Appointment[];
}

const Calendar: React.FC<CalendarProps> = ({ appointments }) => {
    const currentMonth = dayjs();
    const daysInMonth = currentMonth.daysInMonth();

    const getAppointmentsForDay = (day: number) => {
        const dateString = currentMonth.date(day).format('YYYY-MM-DD');
        return appointments.filter((appointment) => appointment.date === dateString);
    };

    const renderDays = () => {
        const days = [];

        for (let i = 1; i <= daysInMonth; i++) {
            const dayAppointments = getAppointmentsForDay(i);

            days.push(
                <div
                    key={i}
                    className={`h-24 p-1 border border-gray-100 rounded-md hover:border-blue-200 cursor-pointer ${styles.calendar__days}`}
                >
                    <div className="text-right text-sm mb-1">{i}</div>
                    {dayAppointments.map((appointment, index) => (
                        <div key={index} className="text-xs bg-blue-100 text-blue-800 rounded px-1 py-0.5 truncate">
                            {appointment.time} - {appointment.type}
                        </div>
                    ))}
                </div>
            );
        }

        return days;
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">Calendar</h3>
                    <div className="flex items-center space-x-2">
                        <button className="flex items-center gap-1 px-3 py-1 text-sm rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100">
                            <FaPlus className='mr-1' /> New Appointment
                        </button>
                        <div className="relative">
                            <select className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-1 px-3 pr-8 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
                                <option>Day</option>
                                <option>Week</option>
                                <option selected>Month</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <FaChevronDown className="text-gray-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                    <button className="p-2 rounded-md hover:bg-gray-100">
                        <FaChevronLeft className="text-gray-500" />
                    </button>
                    <h4 className="text-lg font-medium text-gray-800">{currentMonth.format('MMMM YYYY')}</h4>
                    <button className="p-2 rounded-md hover:bg-gray-100">
                        <FaChevronRight className="text-gray-500" />
                    </button>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                    <div className="text-center text-xs font-medium text-gray-500 py-2">Sun</div>
                    <div className="text-center text-xs font-medium text-gray-500 py-2">Mon</div>
                    <div className="text-center text-xs font-medium text-gray-500 py-2">Tue</div>
                    <div className="text-center text-xs font-medium text-gray-500 py-2">Wed</div>
                    <div className="text-center text-xs font-medium text-gray-500 py-2">Thu</div>
                    <div className="text-center text-xs font-medium text-gray-500 py-2">Fri</div>
                    <div className="text-center text-xs font-medium text-gray-500 py-2">Sat</div>
                </div>

                <div className="grid grid-cols-7 gap-1">
                    {renderDays()}
                </div>
            </div>
        </div>
    );
};

export default Calendar;
