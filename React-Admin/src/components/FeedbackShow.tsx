// import Modal from "./common/Modal";
import Button from "./common/Button";
import { Feedback } from "../models/Feedback";
import React from "react";

type FeedbackShowProps = {
    feedback: Feedback,
    handleClose: () => void,
    handleUpdateFeedback: (id: string, feedback: Feedback) => void
};

const FeedbackShow: React.FC<FeedbackShowProps> = ({ feedback, handleClose, handleUpdateFeedback }) => {

    const handleChangeStatus = () => {
        const updatedFeedback = {...feedback, status: 'REVIEWED'};
        handleUpdateFeedback(feedback._id, updatedFeedback);
    };
    
    const actionBar =
        <div className="flex space-x-2">
            <Button onClick={handleChangeStatus} success>Change Status</Button>
            <Button onClick={handleClose} primary>Close</Button>
            
        </div>

    return (
        // <Modal onClose={handleClose} actionBar={actionBar}>
            <div>
                <p>Text: {feedback.text}</p>
                <p>aviGrade: {feedback.calculatedAviGrade}</p>
                <p className="text-bold">Status: {feedback.status}</p>
            </div>
        // </Modal>
    );
};

export default FeedbackShow;
export type { FeedbackShowProps };