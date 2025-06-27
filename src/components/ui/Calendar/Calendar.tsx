"use client";
import dayjs, { Dayjs } from 'dayjs';
import Link from 'next/link';
import React, { useCallback, useState } from 'react';
import styles from './Calendar.module.scss';
import { Appointment } from '@/types/Appointment';
import { ArrowDown, ArrowLeft, ArrowRight, Plus } from 'lucide-react';


interface CalendarProps {
    appointments: Appointment[];
    minDate?: string;
    maxDate?: string;
}

const Calendar: React.FC<CalendarProps> = ({ appointments, minDate, maxDate }) => {
    const [visibleMonth, setVisibleMonth] = useState<Dayjs>(dayjs().startOf('month'));

    const getColor = useCallback((serviceId: string) => {
        switch (serviceId) {
            case 'haircut':
                return 'bg-blue-100 text-blue-800';
            case 'massage':
                return 'bg-green-100 text-green-600';
            case 'consultation':
                return 'bg-pink-100 text-pink-600';
            default:
                return 'bg-blue-100 text-blue-800';
        }
    }, []);

    const goToPreviousMonth = () => {
        const prev = visibleMonth.subtract(1, 'month');
        if (!minDate || prev.isAfter(dayjs(minDate).startOf('month')) || prev.isSame(dayjs(minDate).startOf('month'))) {
            setVisibleMonth(prev);
        }
    };

    const goToNextMonth = () => {
        const next = visibleMonth.add(1, 'month');
        if (!maxDate || next.isBefore(dayjs(maxDate).startOf('month')) || next.isSame(dayjs(maxDate).startOf('month'))) {
            setVisibleMonth(next);
        }
    };

    const startOfMonth = visibleMonth.startOf('month');
    const daysInMonth = visibleMonth.daysInMonth();
    const startDayOfWeek = startOfMonth.day();

    const getAppointmentsForDay = (date: Dayjs) => {
        const dateString = date.format('YYYY-MM-DD');
        return appointments.filter((a) => a.date.toString() === dateString);
    };

    const renderDays = () => {
        const days = [];
        const totalCells = startDayOfWeek + daysInMonth;

        for (let i = 0; i < totalCells; i++) {
            if (i < startDayOfWeek) {
                days.push(<div key={`empty-${i}`} className="h-24 bg-gray-50 border border-gray-100 rounded-md" />);
            } else {
                const date = visibleMonth.date(i - startDayOfWeek + 1);
                const dayAppointments = getAppointmentsForDay(date);
                const isDisabled = (minDate && date.isBefore(dayjs(minDate))) || (maxDate && date.isAfter(dayjs(maxDate)));

                days.push(
                    <div
                        key={date.format('YYYY-MM-DD')}
                        className={`h-24 p-1 border border-gray-200 rounded-md ${styles.calendar__days} ${isDisabled ? 'bg-gray-50 text-gray-300 cursor-not-allowed' : 'hover:border-blue-200 cursor-pointer'}`}
                    >
                        <div className="text-right text-sm mb-1 text-(--secondary-text-color)">{date.date()}</div>
                        {!isDisabled && dayAppointments.map((appointment) => (
                            <div key={appointment.id} className={`text-xs text-blue-800 rounded px-1 py-0.5 truncate ${getColor(appointment.serviceId)}`}>
                                {appointment.time} - {appointment.serviceId}
                            </div>
                        ))}
                    </div>
                );
            }
        }

        const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
        for (let i = 0; i < remainingCells; i++) {
            days.push(
                <div
                    key={`empty-end-${i}`}
                    className="h-24 p-1 bg-gray-50 border border-gray-100 rounded-md"
                ></div>
            );
        }

        return days;
    };

    return (
        <div className="w-full">
            <div className="p-5 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-(--primary-text-color)">Calendar</h3>
                    <div className="flex items-center space-x-2">
                        <Link href="/appointments/new" className="flex items-center gap-1 px-3 py-1 text-sm rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100">
                            <Plus className='mr-1' /> New Appointment
                        </Link>
                        <div className="relative">
                            <select className="appearance-none bg-(--background) border border-gray-200 text-(--primary-text-color) py-1 px-3 pr-8 cursor-pointer rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                defaultValue="Month">
                                <option>Day</option>
                                <option>Week</option>
                                <option>Month</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-(--primary-text-color)">
                                <ArrowDown className="text-(--tertiary-text-color)" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                    <button className="p-2 rounded-md hover:bg-gray-100" onClick={goToPreviousMonth} disabled={minDate ? visibleMonth.isBefore(dayjs(minDate).startOf('month')) : undefined}>
                        <ArrowLeft className="text-(--tertiary-text-color)" />
                    </button>
                    <h4 className="text-lg font-medium text-(--primary-text-color)">{visibleMonth.format('MMMM YYYY')}</h4>
                    <button className="p-2 rounded-md hover:bg-gray-100" onClick={goToNextMonth} disabled={maxDate ? visibleMonth.isAfter(dayjs(maxDate).startOf('month')) : undefined}>
                        <ArrowRight className="text-(--tertiary-text-color)" />
                    </button>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                        <div key={day} className="text-center text-xs font-medium text-(--tertiary-text-color) py-2">{day}</div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                    {renderDays()}
                </div>
            </div>
        </div>
    );
};

export default Calendar;