import { useState, useEffect, useRef } from 'react';
import { GoChevronDown } from 'react-icons/go';
import Panel from './Panel';

export interface OptionProps<T> {
    value: T;
    label: string;
}

interface DropdownProps<T> {
    options: OptionProps<T>[];
    value?: T;
    onChange: (option: OptionProps<T>) => void;
}

const Dropdown = <T,>({ options, value, onChange }: DropdownProps<T>) => {
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

    const handleOptionClick = (option: OptionProps<T>) => {
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
                key={String(option.value)}
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