//TO DO, create feedbackList component

import React, { useState } from "react";
import Button from "../components/common/Button";
import Skeleton from "../components/common/Skeleton";
import Table, { TableProps } from "../components/common/Table";
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { IconButton } from "@mui/material";
import Panel from "../components/common/Panel";
import FeedbackShow from "../components/FeedbackShow";
import FeedbackStatus from "../components/FeedbackStatus";
import { Feedback } from "../models/Feedback";
import { deleteFeedback, getAllFeedback, updateFeedback } from "../api/feedback";
import ProcessReviewedFeedback from "../api/processReviewedFeedback";
import { GoSync } from 'react-icons/go';

const AdminPage: React.FC = () => {
    const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
    const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
    const [isLoadingFeedback, setIsloadingFeedback] = useState<boolean>(false);

    //we use the id of the feedback to render the right button as loading
    //deletingFeedback is the id of the feedback while it is waiting for the API
    const [deletingFeedback, setDeletingFeedback] = useState<Feedback["_id"] | null>(null);

    const handleGetFeedback = async () => {
        setIsloadingFeedback(true);
        const result = await getAllFeedback();
        if (result.success) {
            setFeedbackList(result.data);
            setIsloadingFeedback(false);
        } else {
            console.error(result.error);
            setIsloadingFeedback(false);
        }
    };

    const handleDeleteFeedback = async (feedbackId: Feedback["_id"]) => {
        setDeletingFeedback(feedbackId);
        const result = await deleteFeedback(feedbackId);
        if (result.success) {
            setDeletingFeedback(null);
            setFeedbackList(feedbackList.filter(item => item._id !== feedbackId));
        } else {
            setDeletingFeedback(null);
            console.error(result.error);
        }
    };

    const handleUpdateFeedback = async (feedbackId: Feedback["_id"], updatedData: Feedback) => {
        const result = await updateFeedback(feedbackId, updatedData);
        if (result.success) {
            setFeedbackList(feedbackList.map(item => item._id === feedbackId ? result.data! : item));


        } else {
            console.error(result.error);
        }
    };

    const handleProcessFeedbackChat = () => {
        ProcessReviewedFeedback('chat-completion');
    }

    const handleProcessFeedbackPrompt = () => {
        ProcessReviewedFeedback('prompt-completion');
    }

    const handleShowFeedback = (listItem: Feedback) => {
        setSelectedFeedback(listItem);
    };

    const handleClose = () => {
        setSelectedFeedback(null);
    };

    const config: TableProps['config'] = [
        {
            label: 'text',
            render: (feedback) => {
                return feedback.text.length > 10
                    ? `${feedback.text.slice(0, 10)}...`
                    : feedback.text;
            }
        },
        {
            label: 'Calculated',
            render: (feedback) => {
                const isRight: boolean = feedback.feedbackAviGrade === feedback.calculatedAviGrade;
                const className = `rounded-lg p-1 ${isRight ? 'bg-green-200' : 'bg-red-200'}`
                return <div className={className}>{feedback.calculatedAviGrade}</div>
            }

        },
        {
            label: 'AviGrade',
            render: (feedback) => feedback.feedbackAviGrade
        },
        {
            label: 'status',
            render: (feedback) => <FeedbackStatus status={feedback.status} />
        },
        {
            label: 'edit',
            render: (feedback) => <IconButton onClick={() => handleShowFeedback(feedback)} aria-label="show" color="primary">
                <EditOutlinedIcon />
            </IconButton>
        },
        {
            label: 'remove',

            render: (feedback) => <IconButton onClick={() => handleDeleteFeedback(feedback._id)} aria-label="delete" color="error">
                {feedback._id === deletingFeedback ? <GoSync className="animate-spin" /> : <DeleteIcon />}
            </IconButton>
        }
    ];

    const keyFn: TableProps['keyFn'] = (feedback) => {
        return feedback._id;
    };

    return (
        <div>
            <div className="flex space-x-2">
                <Button primary onClick={handleGetFeedback} loading={isLoadingFeedback}>Get Feedback</Button>
                <Button success onClick={handleProcessFeedbackChat}>Process Feedback 3.5</Button>
                <Button warning onClick={handleProcessFeedbackPrompt}>Process Feedback Babbage</Button>
            </div>
            <Panel className={"mt-2"}>
                {!isLoadingFeedback && feedbackList.length > 0 && <Table data={feedbackList} config={config} keyFn={keyFn} />}
                {isLoadingFeedback && <Skeleton times={6} className="h-10 w-full mt-2" />}
            </Panel>
            {selectedFeedback && <FeedbackShow 
                feedback={selectedFeedback} 
                handleClose={handleClose}
                handleUpdateFeedback={handleUpdateFeedback} />}
        </div>
    )

}

export default AdminPage;
