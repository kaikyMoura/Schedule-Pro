import React, { JSX } from "react";
import styles from "./Button.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * The content of the button.
     * 
     * e.g. `<Button>Content</Button>`
     * 
     * @type {JSX.Element | string}
     * 
     * @default undefined
     */
    children?: React.ReactNode;
    /**
     * The style of the button.
     * 
     * @type {'primary' | 'secondary' | {type: 'custom', backgroundColor: string, color: string}}
     * 
     * @default 'primary'
     * 
     * */
    buttonStyle: 'primary' | 'secondary' | { type: 'custom'; backgroundColor: string; color: string };
    /** 
     * The width of the button.
     * 
     * @type {number}
     * 
     * @default undefined
     * 
     * */
    width?: number;
    /** 
     * The height of the button.
     * 
     * @type {number}
     * 
     * @default undefined
     * 
     * */
    height?: number;
    /**
     * The text of the button.
     * 
     * @type {string}
     * 
     * @default undefined
     * 
     * */
    text?: string;
    /**
     * The icon of the button.
     * 
     * @type {JSX.Element}
     * 
     * @default undefined
     * 
     * */
    icon?: JSX.Element;
}

/**
 * A customizable button component.
 * @param {ButtonProps} props
 * @prop {JSX.Element | string} [children] - The content of the button.
 * @prop {'primary' | 'secondary' | {type: 'custom', backgroundColor: string, color: string}} [buttonStyle] - The style of the button.
 * @prop {number} [width] - The width of the button.
 * @prop {number} [height] - The height of the button.
 * @prop {string} [text] - The text of the button.
 * @prop {JSX.Element} [icon] - The icon of the button.
 * @prop {React.ButtonHTMLAttributes<HTMLButtonElement>} [rest] - All other props will be transferred to the button element.
 * @returns {JSX.Element} The button component.
 */
const Button = ({
    children,
    buttonStyle,
    width,
    height,
    text,
    icon,
    ...rest
}: ButtonProps) => {
    const isCustom = typeof buttonStyle === 'object' && buttonStyle.type === 'custom';

    const getStyleClass = () => {
        if (isCustom) return '';
        if (buttonStyle === 'primary') return styles.primary;
        if (buttonStyle === 'secondary') return styles.secondary;
        return '';
    };

    const customStyle = isCustom
        ? {
            backgroundColor: buttonStyle.backgroundColor,
            color: buttonStyle.color,
        }
        : {};

    const defaultBaseClass =
        'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium transition-all duration-150';

    return (
        <button
            type={rest.type}
            className={`${styles.custom_button} ${defaultBaseClass} 
            ${getStyleClass()} ${rest.className} py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium ${rest.disabled ? 'opacity-50 cursor-not-allowed' : ''}
            ${rest.disabled ? 'pointer-events-none' : ''}`}
            onClick={rest.onClick}
            disabled={rest.disabled}
            style={{ width, height, ...customStyle }}
            {...rest}
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