import React from 'react';
import Link from './common/Link';

const links = [
    {label: "StreamingPage", path: '/'},
    {label: "AdminPage", path: '/adminpage'},
    {label: "AlertPage", path: '/alertpage'},    
];

const renderedLinks = links.map((link) => {
    return(
        <Link key={link.label} 
        to={link.path} activeClassName={"text-white block py-2 px-4 hover:bg-gray-700 border-l-4 font-bold"} 
        className='text-white py-2 block hover:bg-gray-700'>{link.label}</Link>
    )
});

const ResponsiveNav = () => {
    return (
        <div className="hidden rounded bg-gray-800 text-white p-4 md:w-64 md:min-h-screen md:flex md:flex-col">
            {renderedLinks}
        </div>
    );
};

export default ResponsiveNav;
