import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Link from './common/Link';

const NavBar = () => {
    return (
        <AppBar position="sticky">
            <Toolbar>
                <Link
                    className={"text-white"}
                    to='/infoPage'>
                    <InfoOutlinedIcon />
                </Link>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <InfoOutlinedIcon />
                </IconButton>
                <Typography variant="h6">
                    Leeswijzer
                </Typography >
            </Toolbar>
        </AppBar >
    );
};

export default NavBar;







