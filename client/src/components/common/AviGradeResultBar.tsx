import React from 'react';
import { AviGrade } from '../../models/enums';

interface AviGradeResultBarProps {
    active: AviGrade
};

interface configProps {
    aviGrade: AviGrade;
    label: string;
    activeColorClass: string;
    passiveColorClass: string;
}


const config: configProps[] = [
    {
        aviGrade: AviGrade.aviStart,
        label: "ST",
        activeColorClass: 'bg-green-500',
        passiveColorClass: 'bg-green-200'
    },
    {
        aviGrade: AviGrade.M3,
        label: "M3",
        activeColorClass: 'bg-blue-500',
        passiveColorClass: 'bg-blue-200'
    },
    {
        aviGrade: AviGrade.E3,
        label: "E3",
        activeColorClass: 'bg-yellow-500',
        passiveColorClass: 'bg-yellow-200'
    },
    {
        aviGrade: AviGrade.M4,
        label: "M4",
        activeColorClass: 'bg-red-500',
        passiveColorClass: 'bg-red-200'
    },
    {
        aviGrade: AviGrade.E4,
        label: "E4",
        activeColorClass: 'bg-green-500',
        passiveColorClass: 'bg-green-200'
    },
    {
        aviGrade: AviGrade.M5,
        label: "M5",
        activeColorClass: 'bg-blue-500',
        passiveColorClass: 'bg-blue-200'
    },
    {
        aviGrade: AviGrade.E5,
        label: "E5",
        activeColorClass: 'bg-yellow-500',
        passiveColorClass: 'bg-yellow-200'
    },
    {
        aviGrade: AviGrade.M6,
        label: "M6",
        activeColorClass: 'bg-red-500',
        passiveColorClass: 'bg-red-200'
    },
    {
        aviGrade: AviGrade.E6,
        label: "M6",
        activeColorClass: 'bg-green-500',
        passiveColorClass: 'bg-green-200'
    }
]



const AviGradeResultBar: React.FC<AviGradeResultBarProps> = ({ active }) => {
    const renderedGrades = config.map((item) => {
        const colorClass = item.aviGrade === active ? item.activeColorClass : item.passiveColorClass
        const scaleClass = item.aviGrade === active ? "transform scale-150 font-bold mx-1.5" : "opacity-50";

        return (
            <div
                key={item.aviGrade}
                className={` ${scaleClass} ${colorClass} w-8 h-8 transition-transform duration-300 ease-in-out font-mono text-center flex items-center justify-center rounded`}
            >
                {item.label}
            </div>
        );
    });

    return (
        <div className="mt-3 flex justify-center">
            {renderedGrades}
        </div>
    );
};

export default AviGradeResultBar;