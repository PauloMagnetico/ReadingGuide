import React, { useState, ChangeEvent } from "react";
import Modal from "./common/Modal";
import Button from "./common/Button";
import { Feedback } from "../models/Feedback";
import { FeedbackReviewStatus } from "../models/enums";
import FeedbackStatus from "./FeedbackStatus";


type FeedbackShowProps = {
    feedback: Feedback,
    handleClose: () => void,
    handleUpdateFeedback: (id: string, feedback: Feedback) => void
};

const FeedbackShow: React.FC<FeedbackShowProps> = ({ feedback, handleClose, handleUpdateFeedback }) => {

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [text, setText] = useState<string>(feedback.text);


    const handleChangeStatus = () => {
        const updatedFeedback = { ...feedback, status: FeedbackReviewStatus.reviewed };
        handleUpdateFeedback(feedback._id, updatedFeedback);
    };

    //handles for editing the text
    const handleTextClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
    };

    //handle stop editing
    const handleInputBlur = () => {
        setIsEditing(false);
    };

    const actionBar =
        <div className="flex space-x-2">
            <Button onClick={handleChangeStatus} success>Review Feedback</Button>
            <Button onClick={handleClose} primary>Close</Button>
            <Button onClick={handleClose} primary outline className="text-blue-900">Save</Button>
        </div>

    const isRight: boolean = feedback.feedbackAviGrade === feedback.calculatedAviGrade;



    return (
        <Modal onClose={handleClose} actionBar={actionBar}>
            <div className="grid grid-cols-3 gap-x-10 gap-y-1">
                <div className="font-bold">user Feedback:</div>
                <div className="font-bold">calculated:</div>
                <FeedbackStatus status={feedback.status} />
                <div className="rounded-lg p-1">
                    {feedback.feedbackAviGrade}
                </div>
                <div className={`rounded-lg p-1 ${isRight ? 'bg-green-200' : 'bg-red-200'}`}>
                    {feedback.calculatedAviGrade}
                </div>
            </div>


            <hr className="text" />
            <div className="p-4 mt-2 font-mono">
                {isEditing ? (
                    <textarea
                        value={text}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        className="border p-2 rounded-lg w-full"
                        rows={4} // Adjust the number of rows as needed
                    />
                ) : (
                    <div onClick={handleTextClick} className="cursor-pointer font-mono">
                        {text}
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default FeedbackShow;
export type { FeedbackShowProps };