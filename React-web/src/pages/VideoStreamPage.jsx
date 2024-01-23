import { useRef, useEffect, useState } from "react";
import { IconButton, Snackbar, Alert } from "@mui/material";
import AviGrade from "../components/AviGrade";
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import { sendToChatGPT, extractTextFromImage } from "../api/service";
// import Alert from "../components/common/Alert";

function StreamingPage2() {
    const videoRef = useRef(null);
    const captureCanvasRef = useRef(null);
    const boundingBoxCanvasRef = useRef(null);
    const captureInterval = useRef(null);
    const [extractedText, setExtractedText] = useState('olalala');
    const [aviGrade, setAvigrade] = useState('M3');
    const [isStreaming, setIsStreaming] = useState(false);
    const [alertState, setAlertState] = useState({ severity: "info", message: "Ready To Stream" })
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');

    useEffect(() => {
        return () => {
            if (isStreaming) {
                handleStopStream();
            }
        };
    }, [isStreaming]);

    const setAlert = (newSeverity, newMessage) => {
        setAlertState({
            message: newMessage,
            severity: newSeverity
        });
    };

    const handleStartStream = () => {
        setExtractedText('');
        setAvigrade('');
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
                    setAlert('info', 'Streaming');

                    captureInterval.current = setInterval(async () => {
                        const frameData = captureCroppedFrame();

                        try {
                            const extractedTextResult = await extractTextFromImage(frameData);

                            if (extractedTextResult.success) {
                                const extractedTextData = extractedTextResult.data;
                                drawBoundingBoxes(extractedTextData);
                            } else {
                                setAlert('error', 'Error analyzing: ' + extractedTextResult.error);
                                stopStream();
                            }
                        } catch (error) {
                            setAlert('error', 'Error: ' + error.message);
                            stopStream();
                        }
                    }, 5000);
                }
            }).catch(error => {
                setAlert('error', 'Unable to access the camera: ' + error.message);
            });
        }
    };


    const handleStopStream = () => {
        const stream = videoRef.current?.srcObject;
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
            setIsStreaming(false);
            setAlert('info', 'Stream Stopped')
        }

        if (captureInterval.current) {
            clearInterval(captureInterval.current);
            captureInterval.current = null;
        }

        const captureContext = captureCanvasRef.current?.getContext('2d');
        if (captureContext) {
            captureContext.clearRect(0, 0, captureCanvasRef.current.width, captureCanvasRef.current.height);
        }

        const drawContext = boundingBoxCanvasRef.current?.getContext('2d');
        if (drawContext) {
            drawContext.clearRect(0, 0, boundingBoxCanvasRef.current.width, boundingBoxCanvasRef.current.height);
        }
    };

    const captureCroppedFrame = () => {
        const videoElement = videoRef.current;
        if (videoElement.readyState === HTMLMediaElement.HAVE_ENOUGH_DATA) {
            const canvas = captureCanvasRef.current;
            const ctx = canvas.getContext('2d');

            const squareSide = Math.min(videoElement.videoWidth, videoElement.videoHeight);
            canvas.width = canvas.height = squareSide;
            let sourceX = (videoElement.videoWidth - squareSide) / 2;
            let sourceY = (videoElement.videoHeight - squareSide) / 2;

            ctx.drawImage(videoElement, sourceX, sourceY, squareSide, squareSide, 0, 0, squareSide, squareSide);
            return canvas.toDataURL('image/jpeg');
        }
        return null;
    };

    const drawBoundingBoxes = (extractedTextData) => {
        if (!boundingBoxCanvasRef.current || !videoRef.current) return;
        const boundingBoxCanvas = boundingBoxCanvasRef.current;
        const captureCanvas = captureCanvasRef.current;
        const ctx = boundingBoxCanvas.getContext('2d');

        // Match the bounding box canvas size to the capture canvas size
        boundingBoxCanvas.width = captureCanvas.width;
        boundingBoxCanvas.height = captureCanvas.height;

        ctx.clearRect(0, 0, boundingBoxCanvas.width, boundingBoxCanvas.height);

        const annotations = extractedTextData.responses[0].textAnnotations;
        setExtractedText('');
        if (annotations && annotations.length) {
            setAlert('info', 'text detected');
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
            setAlert('info', "No annotations received from API.");
        }
    };

    const handleAnalyzeText = async () => {
        try {
            const result = await sendToChatGPT(extractedText);
            if (result.success) {
                setAvigrade(result.message);
            } else {
                console.error(result.error);
                setAlert('error', 'Error analyzing: ' + result.error);
            }
        } catch (error) {
            setAlert('error','Error in handleAnalyzeText:', error.message);
        };
        handleStopStream();
    };

    const showSnackBar = (severity, message) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
        clearResult();
    };

    const clearResult = () => {
        setAvigrade('');
        setExtractedText('');
    };

    return (
        <div>
            <Alert severity={alertState.severity} className='mb-2 rounded'>{alertState.message}</Alert>
            <div className="my-1 relative rounded border-2 border-black w-full h-0 pb-100percent">
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
            {aviGrade && !isStreaming && <AviGrade showSnackBar={showSnackBar} calculatedGrade={aviGrade} extractedText={extractedText} />}
            <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default StreamingPage2;