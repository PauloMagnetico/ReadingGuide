import Typography from '@mui/material/Typography';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useState } from 'react';
import InfoPage from '../pages/InfoPage';
import { GoChevronUp } from 'react-icons/go';


// need to use react-router-dom for github pages
// import { Link } from 'react-router-dom';

const NavBar = () => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const handleClick = () => {
        setIsExpanded(!isExpanded);
    }
    return (
        <div className='position-sticky bg-palette_3'>
            <div className={`overflow-hidden transition-all duration-1000 ease-in-out ${isExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
                <InfoPage />
            </div>
            <div className='flex justify-center p-3'>
                <div className='text-white mt-1 mr-4 cursor-pointer' onClick={handleClick}>
                    {isExpanded ? <GoChevronUp /> : <InfoOutlinedIcon />}
                </div>
                <Typography className='text-white' variant='h6'>
                    Leeswijzer
                </Typography>
            </div>
        </div>
    )
}

export default NavBar;







