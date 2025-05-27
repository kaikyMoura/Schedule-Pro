"use client";
import type { ChangeEventHandler, MouseEventHandler } from 'react';
import { useMemo, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
// import styles from './Input.module.css';

interface InputProps {
    onClick?: MouseEventHandler<HTMLInputElement>;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    label?: string;
    value?: string | number;
    placeholder: string;
    type: 'text' | 'password' | 'email' | 'number' | 'file' | 'tel';
    maxLength?: number;
    accept?: string;
    required?: boolean;
}

const Input = ({
    onClick,
    onChange,
    label,
    value,
    placeholder,
    type,
    maxLength,
    accept,
    required
}: InputProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(prev => !prev);
    };

    const renderIcon = useMemo(() => {
        if (type !== 'password') return null;
        return showPassword ? (
            <FaEyeSlash className='text-(--primary-text-color)' />
        ) : (
            <FaEye className='text-(--primary-text-color)' />
        );
    }, [showPassword, type]);

    const inputType = type === 'password' && showPassword ? 'text' : type;

    return (
        <div className="flex flex-col gap-[0.5rem]">
            {label && <label className='block text-sm font-medium text-(--primary-text-color)' htmlFor={label}>{label}</label>}

            <div className="relative flex items-center">
                <input
                    id={label}
                    className="flex-1 pr-[2.5rem] text-(--primary-text-color) bg-(--component-color) border border-gray-200 py-2 px-3 pr-10 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    type={inputType}
                    onClick={onClick}
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                    maxLength={maxLength}
                    accept={accept}
                    required={required}
                />

                {type === 'password' && (
                    <button
                        type="button"
                        onClick={handleTogglePassword}
                        aria-label="Toggle password visibility"
                        className="absolute right-[0.5rem] background-none border-none cursor-pointer text-xl"
                    >
                        {renderIcon}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Input;