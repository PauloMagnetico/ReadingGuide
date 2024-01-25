import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
    return (
        <footer className="bg-gray-700 text-white py-4 fixed bottom-0 w-full">
            <div className="container mx-auto flex justify-center items-center space-x-2">
                <p>&copy; {new Date().getFullYear()} PaoloMagnetico</p>
                <a
                    href="https://github.com/PauloMagnetico/ReadingGuide_v2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" hover:text-gray-300"
                >
                    <GitHubIcon fontSize="small" />
                </a>
                <a
                    href="https://www.linkedin.com/in/laurens-van-gucht-a3099612b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" hover:text-gray-300"
                >
                    <LinkedInIcon fontSize="small" />
                </a>
            </div>
        </footer>
    );
};

export default Footer;

