import classNames from 'classnames';
import React from 'react';

type PanelProps = {
    children: React.ReactNode;
    className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Panel: React.FC<PanelProps> = ({ children, className, ...rest }) => {
    const finalClassName = classNames('border rounded p-3 shadow bg-white w-full', className)
    return (
        <div {...rest} className={finalClassName}>{children}</div>
    );
};

export default Panel;
export type { PanelProps };