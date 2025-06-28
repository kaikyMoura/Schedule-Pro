"use client";
import { CountryCode, SelectOption } from '@/config/countries';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import clsx from 'clsx';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { RefObject, useRef, useState } from 'react';

interface CountrySelectProps {
    className?: string;
    options: readonly SelectOption[];
    value: CountryCode;
    onChange: (value: CountryCode) => void;
}

const CountrySelect = ({ options, value, onChange, className }: CountrySelectProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((option) => option.value === value) || options[0];

    useOnClickOutside(dropdownRef as RefObject<HTMLDivElement>, () => setIsOpen(false));

    const handleSelect = (option: SelectOption) => {
        onChange(option.value as CountryCode);

        setIsOpen(false);
    };

    return (
        <div className="relative w-36" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className={`${className} flex items-center bg-(--component-color) justify-between gap-2 cursor-pointer text-(--primary-text-color) p-2 shadow-md rounded-md border focus:outline-none focus:ring-1 focus:ring-blue-500`}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span className="flex items-center gap-2">
                    <Image src={selectedOption.icon} alt={selectedOption.label} width={22} height={22} />
                    {selectedOption.label}
                </span>
                <ChevronRight className={`ml-2 ${clsx('transition-transform', { 'rotate-90': isOpen })}`} fontSize={20} />
            </button>

            {isOpen && (
                <ul
                    className="absolute z-10 w-full mt-1 overflow-hidden bg-white border border-gray-300 rounded-lg shadow-lg"
                    role="listbox"
                >
                    {options.map((option) => (
                        <li
                            key={option.value}
                            onClick={() => handleSelect(option)}
                            className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100"
                            role="option"
                            aria-selected={value === option.value}
                        >
                            <Image src={option.icon} alt={option.label} width={22} height={22} />
                            <span>{option.label}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CountrySelect;