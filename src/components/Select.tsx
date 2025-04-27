import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';

export type OptionProps = {
  label: string;
  value: string | number;
};

interface SelectProps {
  label?: string;
  name: string;
  options: OptionProps[];
  isError?: boolean;
  errorText?: string;
  required?: boolean;
  value?: string | number;
  onChange: (value: string | number) => void;
  className?: string;
}

const CustomSelect = ({
  label,
  name,
  options,
  isError = false,
  errorText,
  required,
  value,
  onChange,
  className,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | number | null>(
    value ?? null
  );
  const ref = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option: OptionProps) => {
    setSelectedValue(option.value);
    onChange(option.value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="space-y-1 w-full relative" ref={ref}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div        
        className={clsx(
          'flex items-center justify-between',
          'border p-2 cursor-pointer bg-white rounded-md',
          isError ? 'border-red-500' : '',
          selectedValue ? 'text-black' : 'text-gray-400',
          className
        )}
        onClick={toggleDropdown}
      >
        {selectedValue ? (
          options.find((option) => option.value === selectedValue)?.label
        ) : (
          <span className="text-gray-400">Select an option</span>
        )}
        <ChevronDown />
      </div>

      {/* POP UP DROPDOWN */}
      {isOpen && (
        <ul
          className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {options && options.length > 0 ? (
            options.map((option) => (
              <li
                key={option.value}
                className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-black"
                onClick={() => selectOption(option)}
              >
                {option.label}
              </li>
            ))
          ) : (
            <li className="px-3 py-2 text-gray-400">No options</li>
          )}
        </ul>
      )}
      {isError && errorText && (
        <p className="text-sm text-red-600 mt-1">{errorText}</p>
      )}
    </div>
  );
};

export default CustomSelect;
