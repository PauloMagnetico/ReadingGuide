import React, { Fragment } from "react";
import { Feedback } from "../../models/Feedback";

export interface TableProps {
    data: any[];
    config: {
        label: string;
        render: (feedback: Feedback) => React.ReactNode;
        header?: () => React.ReactNode;
      }[];
    keyFn: (data: Feedback) => string;
}

const Table: React.FC<TableProps> = ({ data, config, keyFn }) => {

    const renderedHeaders = config.map((column) => {
        if (column.header) { 
            return <Fragment key={column.label}>{column.header()}</Fragment>;
        }
        return <th className="bg-blue-100" key={column.label}>{column.label}</th>
    })

    const renderedRows = data.map((rowData, index) => {
        const renderedCells = config.map((column)=> {          
            return (
                <td className="p-2" key={column.label}>{column.render(rowData)}</td>
            )
        });
        const rowClass = index % 2 === 0 ? "border-b" : "border-b bg-blue-50";
        return (
            <tr className={rowClass} key={keyFn(rowData)}>
                {renderedCells}
            </tr>
        )
    })
    return (
        <table className="w-full table-auto border-spacing-2">
            <thead>
                <tr className="border-b-2">
                    {renderedHeaders}
                </tr>
            </thead>
            <tbody>
                {renderedRows}
            </tbody>
        </table>
    );
}

export { Table }