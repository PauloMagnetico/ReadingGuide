import React from "react";
import classNames from "classnames";
import useNavigation from "../../hooks/use-navigation";

interface LinkProps {
    to: string;
    children: React.ReactNode;
    className?: string;
    activeClassName?: string;
}

const Link: React.FC<LinkProps> = ({
    to,
    children,
    className,
    activeClassName
}) => {
    const { navigate, currentPath } = useNavigation();

    const classes = classNames(
        'text-blue-500',
        className,
        currentPath === to && activeClassName);

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        if (event.metaKey || event.ctrlKey) {
            return;
        }
        event.preventDefault();
        navigate(to);
    };

    return <a className={classes} href={to} onClick={handleClick}>{children}</a>
}
export default Link;