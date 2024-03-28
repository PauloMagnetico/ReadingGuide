import React, { useState } from "react";
import Button from "../components/common/Button";
import Table, { TableProps } from "../components/common/Table";
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { IconButton } from "@mui/material";
import Panel from "../components/common/Panel";
import FeedbackShow from "../components/FeedbackShow";
import FeedbackStatus from "../components/FeedbackStatus";
import { Feedback } from "../models/Feedback";
import { deleteFeedback, getAllFeedback, updateFeedback } from "../api/feedback";
import { serverUrl } from "../api/serverUrl";

const AdminPage: React.FC = () => {
    const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
    const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);

    const handleGetFeedback = async () => {
        const result = await getAllFeedback();
        if (result.success) {
            setFeedbackList(result.data);
        } else {
            console.error(result.error);
        }
    };

    const handleDeleteFeedback = async (feedbackId: Feedback["_id"]) => {
        const result = await deleteFeedback(feedbackId);
        if (result.success) {
            setFeedbackList(feedbackList.filter(item => item._id !== feedbackId));
        } else {
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


    //TO DO, move to API
    const handleProcessReviewedFeedback = async () => {
        try {
            const response = await fetch(`${serverUrl}/api/feedback`, { method: 'POST' });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Process the response as a Blob
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = "reviewed_feedback.jsonl";
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(downloadUrl);
        } catch (error) {
            console.error('Error downloading the file:', error);
        }
    };

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
            label: 'AviGrade(C/F)',
            render: (feedback) => feedback.calculatedAviGrade + '/' + feedback.feedbackAviGrade
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
                <DeleteIcon />
            </IconButton>
        }
    ];

    const keyFn: TableProps['keyFn'] = (feedback) => {
        return feedback._id;
    };

    return (
        <div>
            <div className="flex space-x-2">
                <Button primary onClick={handleGetFeedback}>Get Feedback</Button>
                <Button success onClick={handleProcessReviewedFeedback}>Process Feedback</Button>
            </div>
            {feedbackList.length > 0 && <Panel className={"mt-2"}>
                <Table data={feedbackList} config={config} keyFn={keyFn} />
            </Panel>}
            {selectedFeedback && <FeedbackShow feedback={selectedFeedback} handleClose={handleClose} handleUpdateFeedback={handleUpdateFeedback} />}
        </div>
    )

}

export default AdminPage;
