import PlayCircleFilledWhiteOutlined from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import StopCircleOutlined from "@mui/icons-material/StopCircleOutlined";
import Troubleshoot from "@mui/icons-material/Troubleshoot";
import ThumbUpOffAlt from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAlt from "@mui/icons-material/ThumbDownOffAlt";

const InfoPage = () => {
    return (
        <div>
            <div className="bg-palette-3 p-4 text-white font-mono">
                <p className="text-justify px-2 leading-loose">
                    Use
                    <PlayCircleFilledWhiteOutlined className="text-lime-600 mx-1" fontSize="medium" />
                    and
                    <StopCircleOutlined className="text-red-600 mx-1" fontSize="medium" />
                    to start scanning your text.
                    When a tekst has been found, you'll see a bounding box around it. Click
                    <Troubleshoot className="text-yellow-600 mx-1" fontSize="medium" />
                    to analyze the text. You'll get back the estimated reading grade. You can use the switch
                    to toggle between scanning mode and feedback mode. In feedback mode,
                    You can provide feedback by clicking the
                    <ThumbUpOffAlt className="text-green-600 mx-1" fontSize="medium" />
                    <ThumbDownOffAlt className="text-red-600 mx-1" fontSize="medium" />
                    buttons. Provide your guestimate when you think I'm wrong. This data will be used to improve the AI.
                </p>
            </div>
        </div>
    );
};

export default InfoPage;
