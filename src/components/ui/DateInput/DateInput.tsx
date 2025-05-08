import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaRegCalendar } from 'react-icons/fa6';

interface DateInputProps {
    label?: string;
    value: Date | null;
    onChange: (date: Date | null, event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => void;
    minDate?: Date;
    maxDate?: Date;
    required?: boolean;
    name?: string;
    id?: string;
}

const DateInput: React.FC<DateInputProps> = ({
    label,
    value,
    onChange,
    minDate,
    maxDate,
    required = false,
    name,
    id,
}) => {
    const inputId = id || name || 'date-input';

    return (
        <div className="flex flex-col gap-1">
            {label && (
                <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <DatePicker
                id={id}
                name={name}
                onChange={onChange}
                selected={value ? new Date(value) : null}
                minDate={minDate}
                maxDate={maxDate}
                placeholderText="yyyy/MM/dd"
                required={required}
                dateFormat="yyyy/MM/dd"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                popperClassName="shadow-lg rounded-md border border-gray-200"
                calendarClassName="bg-white p-2 rounded-md"
            />
            <FaRegCalendar className="absolute inset-y-8.5 right-2 flex items-center pointer-events-none text-gray-500" />
        </div>
    );
};

export default DateInput;