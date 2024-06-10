import React, { RefObject } from 'react';


import { IconButton } from "@mui/material";
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';

interface VideoStreamProps {
    videoRef: RefObject<HTMLVideoElement>;
    captureCanvasRef: RefObject<HTMLCanvasElement>;
    boundingBoxCanvasRef: RefObject<HTMLCanvasElement>;
    isStreaming: boolean;
    extractedText: string | null;
    handleStartStream: () => void;
    handleStopStream: () => void;
    handleAnalyzeText: () => void;
}

const VideoStream: React.FC<VideoStreamProps> = ({
    videoRef,
    captureCanvasRef,
    boundingBoxCanvasRef,
    isStreaming,
    extractedText,
    handleStartStream,
    handleStopStream,
    handleAnalyzeText
}) => {
    return (
        <div>
            <video
                className="absolute w-full h-full object-cover"
                ref={videoRef}
                autoPlay
                playsInline
                muted
            ></video>
            <canvas
                className="absolute w-full h-full opacity-0"
                ref={captureCanvasRef}>
            </canvas>
            <canvas
                className="absolute w-full h-full opacity-50"
                ref={boundingBoxCanvasRef}>
            </canvas>
            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                {!isStreaming && <IconButton onClick={handleStartStream} className="z-10">
                    <PlayCircleFilledWhiteOutlinedIcon className="text-lime-600" fontSize="large" />
                </IconButton>}
                {isStreaming && !extractedText && <IconButton onClick={handleStopStream} className="z-10">
                    <StopCircleOutlinedIcon className="text-red-600" fontSize="large" />
                </IconButton>}
                {isStreaming && extractedText && <IconButton onClick={handleAnalyzeText} className="z-10">
                    <TroubleshootIcon className="text-yellow-600" fontSize="large" />
                </IconButton>}
            </div>
        </div>
    )
};

export default VideoStream;