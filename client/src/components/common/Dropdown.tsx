import React, { useState, useEffect, useRef } from 'react';
import { GoChevronDown } from 'react-icons/go';
import Panel from './Panel';

export interface OptionProps {
    value: string;
    label: string;
}

interface DropdownProps {
    options: OptionProps[];
    value?: string;
    onChange: (option: OptionProps) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const divEl = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (event: MouseEvent) => {
            if (!divEl.current) {
                return;
            }

            if ((!divEl.current.contains(event.target as Node))) {
                setIsOpen(false);
            };
        };

        document.addEventListener('click', handler, true);
        return () => {
            document.removeEventListener('click', handler) //cleanup
        }
    }, [])

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option: OptionProps) => {
        // CLOSE DROPDOWN
        setIsOpen(false);
        // WHAT OPTION DID THE USER CLICK ON???
        onChange(option);
    };

    const renderedOptions = options.map((option) => {
        return (
            <div
                className="hover:bg-sky-100 rounded cursor-pointer p-1"
                onClick={() => handleOptionClick(option)}
                key={option.value}
            >
                {option.label}
            </div>
        );
    });

    return (
        <div ref={divEl} className="w-48 relative">
            <Panel
                className="flex justify-between items-center cursor-pointer"
                onClick={handleClick}
            >
                {options.find(opt => opt.value === value)?.label || 'Select...'}
                <GoChevronDown />
            </Panel>
            {isOpen && <Panel className="absolute top-full">{renderedOptions}</Panel>}
        </div>
    );
}

export default Dropdown;