"use client";
import type { ChangeEventHandler, MouseEventHandler } from 'react';
import { useMemo, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
// import styles from './Input.module.css';

interface InputProps {
    /**
     * The input onClick event handler.
     * 
     * @default undefined
     */
    onClick?: MouseEventHandler<HTMLInputElement>;
    /**
     * The input onChange event handler.
     * 
     * @default undefined
     */
    onChange?: ChangeEventHandler<HTMLInputElement>;
    /**
     * The input label.
     * 
     * @default ''
     */
    label?: string;
    /**
     * Classes to apply to the input.
     * 
     * @default ''
    */
    className?: string
    /**
     * The input value.
     * 
     * @default ''
     */
    value?: string | number;
    /**
     * The input placeholder.
     * 
     * @default ''
     */
    placeholder: string;
    /**
     * The input type.
     * 
     * @default 'text'
     * */
    type: 'text' | 'password' | 'email' | 'number' | 'file' | 'tel';
    /**
     * The maximum length of the displayed value.
     * 
     * @default false
     */
    maxLength?: number;
    /**
     * The accepted input types.
     * 
     * @default undefined
     */
    accept?: string;
    /**
     * Indicates if the input is required.
     * 
     * @default false
     */
    required?: boolean;
    /**
     * Indicates if the input is in an error state.
     * 
     * @default false
     */
    error?: boolean;
}

/**
 * A controlled input component.
 *
 * @param {{ onClick?: MouseEventHandler<HTMLInputElement>; onChange?: ChangeEventHandler<HTMLInputElement>; label?: string; value?: string | number; placeholder: string; type: 'text' | 'password' | 'email' | 'number' | 'file' | 'tel'; maxLength?: number; accept?: string; required?: boolean; error?: boolean; }} props
 * @returns {JSX.Element}
 */
const Input = ({
    onClick,
    onChange,
    label,
    className,
    value,
    placeholder,
    type,
    maxLength,
    accept,
    required,
    error
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
                    className={`${className} flex-1 pr-[2.5rem] text-(--primary-text-color) bg-(--component-color) border border-gray-200 py-2 px-3 pr-10 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
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
                        className={`absolute right-[0.5rem] background-none border-none cursor-pointer text-xl ${error && 'text-red-500 border-red-500'}`}
                    >
                        {renderIcon}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Input;