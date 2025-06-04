"use client";

interface CheckboxProps {
    id?: string;
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    className?: string;
  }
  
  const Checkbox: React.FC<CheckboxProps> = ({
    id,
    label,
    checked,
    onChange,
    disabled = false,
    className = '',
  }) => {
    return (
      <label
        htmlFor={id}
        className={`flex items-center cursor-pointer gap-2 text-sm select-none ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      >
        <div className="relative">
          <input
            id={id}
            type="checkbox"
            className="sr-only"
            checked={checked}
            disabled={disabled}
            onChange={(e) => onChange(e.target.checked)}
          />
          <div
            className={`w-5 h-5 border-2 rounded-sm flex items-center justify-center transition-colors hover:border-blue-600
              ${checked ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-400'}
              ${disabled ? 'bg-gray-200 border-gray-300' : ''}
            `}
          >
            {checked && (
              <svg
                className="w-5 h-5 text-white"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path d="M6 10l3 3l6-6" />
              </svg>
            )}
          </div>
        </div>
        <span className="text-(--primary-text-color)">{label}</span>
      </label>
    );
  };
  
  export default Checkbox;