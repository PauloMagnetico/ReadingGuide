import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Link from './common/Link';
// need to use react-router-dom for github pages
// import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <AppBar position="sticky">
            <Toolbar className='bg-palette_3'>
                <Link
                    className='text-white mr-2'
                    to='/infoPage'>
                    <IconButton
                        size='large'
                        edge='start'
                        color='inherit'
                        aria-label='menu'
                    sx={{ mr: 2 }}
                    >
                        <InfoOutlinedIcon />
                    </IconButton>
                </Link>
                <Typography variant='h6'>
                    Leeswijzer
                </Typography>
            </Toolbar>
        </AppBar >
    );
};

export default NavBar;







