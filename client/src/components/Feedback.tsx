import IconButton from '@mui/material/IconButton';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import FeedbackBar from './FeedbackBar';
import { useState } from "react";
import { createFeedback } from '../api/feedback';
import { AviGrade, Severity } from '../models/enums';

interface FeedbackProps {
    extractedText: string,
    calculatedGrade: AviGrade,
    showSnackBar: (severity: Severity, message: string) => void;
};

const Feedback: React.FC<FeedbackProps> = ({ 
    extractedText, 
    calculatedGrade, 
    showSnackBar 
}) => {
    const [showFeedbackBar, setShowFeedbackBar] = useState(false);

    const handlePositiveFeedback = async () => {
        const result = await createFeedback(extractedText, calculatedGrade, calculatedGrade);
        if (result.success) {
            showSnackBar(Severity.success, 'Thanks for the positive feedback');
        } else {
            const errorMessage = result.error ? result.error : "Unknown error occurred";
            showSnackBar(Severity.error, 'Error submitting feedback: ' + errorMessage);
        }
    };

    const handleNegativeFeedback = () => {
        setShowFeedbackBar(true);
        //show the dropdown
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton onClick={handlePositiveFeedback} aria-label="thumbsUp" color="success">
                    <ThumbUpOffAltIcon />
                </IconButton>
                <IconButton onClick={handleNegativeFeedback} aria-label="thumbsDown" color="error">
                    <ThumbDownOffAltIcon />
                </IconButton>
            </div>
            {showFeedbackBar && <FeedbackBar />}
        </div>
    )
}

export default Feedback;


