import Modal from "./common/Modal";
import Button from "./common/Button";

function FeedbackShow({ feedback, handleClose, handleUpdateFeedback }) {

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
        <Modal onClose={handleClose} actionBar={actionBar}>
            <div>
                <p>Text: {feedback.text}</p>
                <p>aviGrade: {feedback.aviGrade}</p>
                <p className="text-bold">Status: {feedback.status}</p>
            </div>
        </Modal>
    );
};

export default FeedbackShow;