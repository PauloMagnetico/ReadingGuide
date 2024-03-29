import { Alert } from "@mui/material";
import PlayCircleFilledWhiteOutlined from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import StopCircleOutlined from "@mui/icons-material/StopCircleOutlined";
import Troubleshoot from "@mui/icons-material/Troubleshoot";
import ThumbUpOffAlt from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAlt from "@mui/icons-material/ThumbDownOffAlt";

const InfoPage = () => {
    return (
        <div>
            <Alert severity='info' className='mb-2 rounded'>How to use the app</Alert>
            <div className="bg-gray-100 p-2 relative my-1 rounded-xl border-8 border-double border-palette_4 w-full h-0 pb-100percent">
                <p className="text-justify p-2 leading-loose">
                    Use
                    <PlayCircleFilledWhiteOutlined className="text-lime-600 mx-1" fontSize="medium" />
                    and
                    <StopCircleOutlined className="text-red-600 mx-1" fontSize="medium" />
                    to start scanning your text.
                    When a tekst has been found, you'll see a bounding box around it. Click
                    <Troubleshoot className="text-yellow-600 mx-1" fontSize="medium" />
                    to analyze the text. You'll get back the estimated reading grade.
                    You can provide feedback by clicking the
                    <ThumbUpOffAlt className="text-green-600 mx-1" fontSize="medium" />
                    <ThumbDownOffAlt className="text-red-600 mx-1" fontSize="medium" />
                    buttons. If you think the reading grade is wrong, you can provide your
                    guess by the extra buttons like
                    <span className="mx-2 border-2 rounded border-green-600 bg-green-200 px-2">M3</span>
                    that appear.
                    This data will be used to improve my knowledge.
                </p>
            </div>
        </div>
    );
};

export default InfoPage;
