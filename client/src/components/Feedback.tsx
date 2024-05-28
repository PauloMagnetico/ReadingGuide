import IconButton from '@mui/material/IconButton';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
// import FeedbackBar from './FeedbackBar';
import { useState } from "react";
import { createFeedback } from '../api/feedback';
import { AviGrade, Severity } from '../models/enums';
import Dropdown, { OptionProps } from './common/Dropdown';
import Button from './common/Button';

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

    // we set the default of the dropdown to the calculated grade, this can be replaced
    // by a fance spinner component in the future

    const [selection, setSelection] = useState<AviGrade>(calculatedGrade);

    const handlePositiveFeedback = async () => {
        const result = await createFeedback(
            extractedText,
            calculatedGrade,
            calculatedGrade
        );
        if (result.success) {
            showSnackBar(Severity.success, 'Thanks for the feedback');
        } else {
            const errorMessage = result.error ? result.error : "Unknown error occurred";
            showSnackBar(Severity.error, 'Error submitting feedback: ' + errorMessage);
        }
    };

    const showNegativeFeedback = () => {
        //show the dropdown
        setShowFeedbackBar(true);
    };

    // creating a negative feedback with the selected avigrade
    const handleNegativeFeedback = async () => {
        const result = await createFeedback(extractedText, calculatedGrade, selection!);
        if (result.success) {
            showSnackBar(Severity.success, 'Thanks for the feedback');
        } else {
            const errorMessage = result.error ? result.error : "Unknown error occurred";
            showSnackBar(Severity.error, 'Error submitting feedback: ' + errorMessage);
        }
    };

    //translate the enum into dropdown options
    const aviGradeOptions =
        Object.values(AviGrade).map(value => ({
            value: value,
            label: value
        }));


    //handle dropdown selection
    const handleSelect = (option: OptionProps) => {
        setSelection(option.value as AviGrade);
    }

    return (
        <div>
            <div className='flex justify-end'>
                <IconButton onClick={handlePositiveFeedback} aria-label="thumbsUp" color="success">
                    <ThumbUpOffAltIcon />
                </IconButton>
                <IconButton onClick={showNegativeFeedback} aria-label="thumbsDown" color="error">
                    <ThumbDownOffAltIcon />
                </IconButton>
            </div>
            {showFeedbackBar &&
                <div className='flex flex-row justify-between'>
                    <Dropdown options={aviGradeOptions} value={selection} onChange={handleSelect} />
                    <Button primary onClick={handleNegativeFeedback}>Submit</Button>
                </div>}
        </div>
    )
}

export default Feedback;


