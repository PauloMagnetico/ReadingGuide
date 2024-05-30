import IconButton from '@mui/material/IconButton';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
// import FeedbackBar from './FeedbackBar';
import { useState } from "react";
import { createFeedback } from '../api/feedback';
import { AviGrade, Severity } from '../models/enums';
import Dropdown, { OptionProps } from './common/Dropdown';
import Button from './common/Button';
import { GoSync } from 'react-icons/go';


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
    const [showFeedbackDropdown, setshowFeedbackDropdown] = useState(false);

    // we set the default of the dropdown to the calculated grade, this can be replaced
    // by a fance spinner component in the future

    const [selection, setSelection] = useState<AviGrade>(calculatedGrade);
    const [isNegativeLoading, setIsNegativeLoading] = useState<boolean>(false);
    const [isPositiveLoading, setIsPositiveLoading] = useState<boolean>(false);

    const handlePositiveFeedback = async () => {
        setIsPositiveLoading(true)
        const result = await createFeedback(
            extractedText,
            calculatedGrade,
            calculatedGrade
        );
        if (result.success) {
            setIsPositiveLoading(false);
            showSnackBar(Severity.success, 'Thanks for the feedback');
        } else {
            setIsPositiveLoading(false);
            const errorMessage = result.error ? result.error : "Unknown error occurred";
            showSnackBar(Severity.error, 'Error submitting feedback: ' + errorMessage);
        }
    };

    const showNegativeFeedback = () => {
        //show the dropdown
        setshowFeedbackDropdown(true);
    };

    // creating a negative feedback with the selected avigrade
    const handleNegativeFeedback = async () => {
        setIsNegativeLoading(true);
        const result = await createFeedback(extractedText, calculatedGrade, selection!);
        if (result.success) {
            setIsNegativeLoading(false);
            showSnackBar(Severity.success, 'Thanks for the feedback');
        } else {
            setIsNegativeLoading(false);
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
    const handleSelect = (option: OptionProps<AviGrade>) => {
        setSelection(option.value);
    }

    return (
        <div>
            <div className='flex justify-end'>
                <IconButton onClick={handlePositiveFeedback} aria-label="thumbsUp" color="success">
                    {isPositiveLoading ? <GoSync className="animate-spin" /> : <ThumbUpOffAltIcon />}
                </IconButton>
                <IconButton onClick={showNegativeFeedback} aria-label="thumbsDown" color="error">
                    <ThumbDownOffAltIcon />
                </IconButton>
            </div>
            {showFeedbackDropdown &&
                <div className='flex flex-row justify-between'>
                    <Dropdown options={aviGradeOptions} value={selection} onChange={handleSelect} />
                    <Button primary onClick={handleNegativeFeedback} loading={isNegativeLoading}>Submit</Button>
                </div>}
        </div>
    )
}

export default Feedback;


