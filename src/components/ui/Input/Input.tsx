"use client";
import type { ForwardedRef, JSX } from 'react';
import { forwardRef, useMemo, useState } from 'react';
import { FieldError } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string; 
    error?: FieldError
}

/**
 * A controlled input component.
 *
 * @param {{ onClick?: MouseEventHandler<HTMLInputElement>; onChange?: ChangeEventHandler<HTMLInputElement>; label?: string; value?: string | number; placeholder: string; type: 'text' | 'password' | 'email' | 'number' | 'file' | 'tel'; maxLength?: number; accept?: string; required?: boolean; error?: boolean; }} props
 * @returns {JSX.Element}
 */
const InputBase = ({ label, error, type, ...rest }: InputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
    const [showPassword, setShowPassword] = useState(false);
    const [errorState, setErrorState] = useState(!!error);

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

    const handleError = () => {
        setErrorState(false);
    }

    return (
        <div className="flex flex-col gap-[0.5rem]">
            {label && <label className='block text-sm font-medium text-(--primary-text-color)' htmlFor={label}>{label}</label>}

            <div className="relative flex items-center">
                <input
                    id={label}
                    ref={ref}
                    className={`${rest.className} flex-1 pr-[2.5rem] text-(--primary-text-color) bg-(--component-color) border border-gray-200 py-2 px-3 pr-10 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${errorState && 'text-red-500 border-red-500'}`}
                    type={inputType}
                    {...rest}
                    onFocus={handleError}
                />

                {type === 'password' && (
                    <button
                        type="button"
                        onClick={handleTogglePassword}
                        aria-label="Toggle password visibility"
                        className={`absolute right-[0.5rem] background-none border-none cursor-pointer text-xl`}
                    >
                        {renderIcon}
                    </button>
                )}
            </div>
            {error && (
                <span className="block text-sm text-red-600">
                    {error.message}
                </span>
            )}
        </div>
    );
};

export const Input = forwardRef(InputBase);