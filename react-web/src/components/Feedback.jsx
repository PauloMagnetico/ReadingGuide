import IconButton from '@mui/material/IconButton';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import FeedbackBar from './feedbackBar';
import { useState } from "react";
import { createFeedback } from '../api/service';

export default function Feedback({ extractedText, calculatedGrade, showSnackBar }) {

    const [showFeedbackBar, setShowFeedbackBar] = useState(false);

    const handlePositiveFeedback = async () => {
        const result = await createFeedback(extractedText, calculatedGrade, calculatedGrade);
        if (result.success) {
            // If feedback creation was successful
            showSnackBar('success', 'Thanks for the positive feedback');
        } else {
            // If there was an error in feedback creation
            showSnackBar('error', 'Error submitting feedback: ' + result.error);
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

