import { Input } from '@/components/ui/Input';
import { useRef } from 'react';

interface OTPInputProps {
    /**
     * Number of input fields to display for the OTP.
     * 
     * @default 6
     */
    length?: number;
    /**
     * Callback function that is called with the complete OTP value as a string whenever the input changes.
     * 
     * @param {string} value - The complete OTP value as a string.
     */
    onChange: (value: string) => void;
}

/**
 * A functional component for rendering an OTP (One-Time Password) input field.
 * 
 * @param {Object} props - Component properties.
 * @param {number} [props.length=6] - Number of input fields to display for the OTP. Defaults to 6.
 * @param {Function} props.onChange - Callback function that is called with the complete OTP value as a string whenever the input changes.
 * 
 * This component renders a series of single-character input fields designed for entering an OTP code. 
 * It handles focus transitions between inputs as the user types and supports backspace navigation to 
 * the previous input. The OTP input values are combined and passed to the `onChange` callback.
 */
const OTPInput = ({ length = 6, onChange }: OTPInputProps) => {
    const inputs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (index: number, value: string) => {
        const input = value.replace(/\D/, '');
        if (input && index < length - 1) {
            inputs.current[index + 1]?.focus();
        }

        const values = inputs.current.map((input) => input?.value || '').join('');
        onChange(values);
    };

    const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Backspace' && !inputs.current[index]?.value && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };

    return (
        <div className="flex gap-2 justify-center">
            {Array.from({ length }).map((_, index) => (
                <Input
                    key={index}
                    type="text"
                    maxLength={1}
                    autoComplete="none"
                    autoCorrect="off"
                    spellCheck="false"
                    name="otp-1"
                    inputMode="numeric"
                    ref={(el) => { inputs.current[index] = el; }}
                    className="w-12 h-12 text-center text-(--primary-text-color) border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                />
            ))}
        </div>
    );
};

export default OTPInput;