import Link from './Link';
import Button from './Button';

const LinkButton = ({ to, children, className }) => {
    return (
        <Link
            to={to}
            className={className}>
            <Button className="border-0">{children}</Button>
        </Link>
    );
};

export default LinkButton;
