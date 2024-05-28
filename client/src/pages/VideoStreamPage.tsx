import React, { useRef, useEffect, useState } from "react";
import { IconButton, Snackbar, Alert } from "@mui/material";
import AviGradeShow from "../components/AviGradeShow";
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import { sendToChatGPT } from "../api/chatApi";
import { extractTextFromImage } from "../api/textApi";
import { Severity, AviGrade } from "../models/enums";


const StreamingPage: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const captureCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const boundingBoxCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const captureInterval = useRef<number | null>(null);
    const [extractedText, setExtractedText] = useState<string>('olalala');
    const [calculatedAviGrade, setCalculatedAvigrade] = useState<AviGrade | null>(AviGrade.M3);
    const [isStreaming, setIsStreaming] = useState(false);
    const [alertState, setAlertState] = useState({ severity: Severity.info, message: "Ready To Stream" })
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState(Severity.info);

    useEffect(() => {
        return () => {
            if (isStreaming) {
                handleStopStream();
            }
        };
    }, [isStreaming]);

    const setAlert = (newSeverity: Severity, newMessage: string) => {
        setAlertState({
            message: newMessage,
            severity: newSeverity
        });
    };

    const handleStartStream = () => {
        setExtractedText('');
        setCalculatedAvigrade(null);
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            const constraints = {
                video: {
                    facingMode: 'environment'
                }
            };
            navigator.mediaDevices.getUserMedia(constraints).then(stream => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    setIsStreaming(true);
                    setAlert(Severity.info, 'Streaming');

                    captureInterval.current = window.setInterval(async () => {
                        const frameData = captureCroppedFrame();

                        try {
                            const extractedTextResult = await extractTextFromImage(frameData!);

                            if (extractedTextResult.success) {
                                const extractedTextData = extractedTextResult.data;
                                drawBoundingBoxes(extractedTextData);
                            } else {
                                setAlert(Severity.error, 'Error analyzing: ' + extractedTextResult.error);
                                handleStopStream();
                            }
                        } catch (err) {
                            if (err instanceof Error) {
                                setAlert(Severity.error, 'Error: ' + err.message);
                            } else {
                                setAlert(Severity.error, 'Unknown error occurred');
                            };
                            handleStopStream();
                        }
                    }, 5000);
                }
            }).catch(err => {
                setAlert(Severity.error, 'Unable to access the camera: ' + err.message);
            });
        }
    };


    // removed the check if there is a stream, because we check the videoRef instead
    // to match the types. If anything is broken revert to the original
    const handleStopStream = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
            setIsStreaming(false);
            setAlert(Severity.info, 'Stream Stopped')

        }

        if (captureInterval.current) {
            clearInterval(captureInterval.current);
            captureInterval.current = null;
        }

        const captureContext = captureCanvasRef.current?.getContext('2d');
        if (captureContext && captureCanvasRef.current) {
            captureContext.clearRect(0, 0, captureCanvasRef.current.width, captureCanvasRef.current.height);
        }

        const drawContext = boundingBoxCanvasRef.current?.getContext('2d');
        if (drawContext && boundingBoxCanvasRef.current) {
            drawContext.clearRect(0, 0, boundingBoxCanvasRef.current.width, boundingBoxCanvasRef.current.height);
        }
    };

    const captureCroppedFrame = () => {
        const videoElement = videoRef.current;
        if (videoElement && videoElement.readyState === HTMLMediaElement.HAVE_ENOUGH_DATA) {
            const canvas = captureCanvasRef.current;
            if (!canvas) return null;
            const ctx = canvas.getContext('2d');
            if (!ctx) return null;
            const squareSide = Math.min(videoElement.videoWidth, videoElement.videoHeight);
            canvas.width = canvas.height = squareSide;
            let sourceX = (videoElement.videoWidth - squareSide) / 2;
            let sourceY = (videoElement.videoHeight - squareSide) / 2;

            ctx.drawImage(videoElement, sourceX, sourceY, squareSide, squareSide, 0, 0, squareSide, squareSide);
            return canvas.toDataURL('image/jpeg');
        }
        return null;
    };

    // TO DO
    //this type should be defined somwhere else, this is the generic response from the google api
    type drawBoundingBoxesRequest = {
        responses: [{
            textAnnotations: [{
                description: string,
                boundingPoly: {
                    vertices: [{
                        x: number,
                        y: number
                    }]
                }
            }]
        }]
    };

    const drawBoundingBoxes = (extractedTextData: drawBoundingBoxesRequest) => {
        if (!boundingBoxCanvasRef.current || !videoRef.current) return null;
        const boundingBoxCanvas = boundingBoxCanvasRef.current;
        const captureCanvas = captureCanvasRef.current;
        if (!captureCanvas) return null;
        const ctx = boundingBoxCanvas.getContext('2d');
        if (!ctx) return null;

        // Match the bounding box canvas size to the capture canvas size
        boundingBoxCanvas.width = captureCanvas.width;
        boundingBoxCanvas.height = captureCanvas.height;

        ctx.clearRect(0, 0, boundingBoxCanvas.width, boundingBoxCanvas.height);

        const annotations = extractedTextData.responses[0].textAnnotations;
        setExtractedText('');
        if (annotations && annotations.length) {
            setAlert(Severity.info, 'text detected');
            setExtractedText(annotations[0].description);

            annotations.shift(); // Skip the first annotation which is the full text

            // Assuming the capture canvas has been cropped to a square, calculate scale ratio
            const scale = boundingBoxCanvas.width / Math.min(captureCanvas.width, captureCanvas.height);

            annotations.forEach(annotation => {
                const vertices = annotation.boundingPoly.vertices;

                ctx.beginPath();
                ctx.moveTo(vertices[0].x * scale, vertices[0].y * scale);
                for (let i = 1; i < vertices.length; i++) {
                    ctx.lineTo(vertices[i].x * scale, vertices[i].y * scale);
                }
                ctx.lineTo(vertices[0].x * scale, vertices[0].y * scale);
                ctx.closePath();
                ctx.lineWidth = 2;
                ctx.strokeStyle = 'red';
                ctx.stroke();
            });
        } else {
            setAlert(Severity.info, "No annotations received from API.");
        }
    };

    const handleAnalyzeText = async () => {
        try {
            const result = await sendToChatGPT(extractedText);
            if (result.success) {
                setCalculatedAvigrade(result.data);
            } else {
                console.error(result.error);
                setAlert(Severity.error, 'Error analyzing: ' + result.error);
            }
        } catch (err) {
            if (err instanceof Error) {
                setAlert(Severity.error, 'Error: ' + err.message);
            } else {
                setAlert(Severity.error, 'Unknown error occurred');
            };
        };
        handleStopStream();
    };

    const showSnackBar = (severity: Severity, message: string) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    //closing the Snackbar clears the result, so the feedback component is not visible, pretty bad design
    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
        clearResult();
    };

    const clearResult = () => {
        setCalculatedAvigrade(null);
        setExtractedText('');
    };

    return (
        <div>
            <Alert severity={alertState.severity} className='mb-2 rounded'>{alertState.message}</Alert>
            <div className="bg-gray-100 my-1 relative rounded-xl border-double border-8 border-palette_4 shadow-md w-full h-0 pb-100percent">
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
            {calculatedAviGrade && !isStreaming &&
                <AviGradeShow
                    showSnackBar={showSnackBar}
                    calculatedGrade={calculatedAviGrade}
                    extractedText={extractedText} />}
            <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default StreamingPage;