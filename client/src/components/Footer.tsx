import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer: React.FC = () => {
    return (
        <footer className="bg-palette_4 text-white py-6 bottom-0">
            <div className="container mx-auto flex justify-center items-center space-x-2">
                <p>&copy; {new Date().getFullYear()} PaoloMagnetico</p>
                <a
                    href="https://github.com/PauloMagnetico/ReadingGuide_v2"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className=" hover:text-gray-300"
                >
                    <GitHubIcon fontSize="small" />
                </a>
                <a
                    href="https://www.linkedin.com/in/laurens-van-gucht-a3099612b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className=" hover:text-gray-300"
                >
                    <LinkedInIcon fontSize="small" />
                </a>
            </div>
        </footer>
    );
};

export default Footer;

