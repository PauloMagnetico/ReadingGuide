import React, { useState } from "react";
import Button from "../components/common/Button";
import {Table, TableProps } from "../components/common/Table";
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { IconButton } from "@mui/material";
import Panel from "../components/common/Panel";
import FeedbackShow from "../components/FeedbackShow";
import FeedbackStatus from "../components/FeedbackStatus";
import { Feedback } from "../models/Feedback";

const AdminPage: React.FC = () => {
    const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
    const [selectedFeedback, setSelectedFeedback] = useState<Feedback>();

    const getAllFeedback = async () => {
        try {
            const response = await fetch('https://192.168.0.120:3000/api/feedback', {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            setFeedbackList(result)
        } catch (error) {
            console.error('Error fetching feedback:', error);
        }
    };

    const handleDeleteFeedback = async (feedbackId: Feedback["_id"]) => {
        try {
            const response = await fetch(`https://192.168.0.120:3000/api/feedback/${feedbackId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            console.log("Feedback deleted successfully");

            // Update the state to filter out the deleted feedback
            setFeedbackList(feedbackList.filter(item => item._id !== feedbackId));

        } catch (error) {
            console.error('Error deleting feedback:', error);
        }
    };

    const handleUpdateFeedback = async (feedbackId: Feedback["_id"], updatedData: Feedback) => {
        try {
            const response = await fetch(`https://192.168.0.120:3000/api/feedback/${feedbackId}`, {
                method: 'PUT', // or 'PATCH' depending on your API
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData), // Send the updated data as JSON
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const updatedFeedback = await response.json();
            console.log("Feedback updated successfully", updatedFeedback);

            // Update the state with the updated feedback
            setFeedbackList(feedbackList.map(item => item._id === feedbackId ? updatedFeedback : item));

        } catch (error) {
            console.error('Error updating feedback:', error);
        }
    };

    const handleProcessReviewedFeedback = async () => {
        try {
            const response = await fetch('https://192.168.0.120:3000/api/feedback/process', { method: 'POST' });
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

    const handleShowFeedback = (listItem) => {
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
                <Button primary onClick={getAllFeedback}>Get Feedback</Button>
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
