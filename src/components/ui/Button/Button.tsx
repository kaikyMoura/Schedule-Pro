import React, { JSX } from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
    children?: React.ReactNode;
    style: 'primary' | 'secondary' | { type: 'custom'; backgroundColor: string; color: string };
    type?: 'button' | 'submit' | 'reset';
    width?: number;
    height?: number;
    text?: string;
    className?: string;
    action?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    icon?: JSX.Element;
}

const Button: React.FC<ButtonProps> = ({
    children,
    style,
    type = 'button',
    width,
    height,
    text,
    className = '',
    action,
    disabled = false,
    icon,
}) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (action) action(event);
    };

    const isCustom = typeof style === 'object' && style.type === 'custom';

    const getStyleClass = () => {
        if (isCustom) return '';
        if (style === 'primary') return styles.primary;
        if (style === 'secondary') return styles.secondary;
        return '';
    };

    const customStyle = isCustom
        ? {
            backgroundColor: style.backgroundColor,
            color: style.color,
        }
        : {};

    const defaultBaseClass =
        'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium transition-all duration-150';

    return (
        <button
            type={type}
            className={`${styles.custom_button} ${defaultBaseClass} ${getStyleClass()} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleClick}
            disabled={disabled}
            style={{ width, height, ...customStyle }}
        >
            {text || icon ? (
                <div className="flex items-center gap-2">
                    {icon && icon}
                    {text && <p>{text}</p>}
                </div>
            ) : (
                children
            )}
        </button>
    );
};

export default Button;