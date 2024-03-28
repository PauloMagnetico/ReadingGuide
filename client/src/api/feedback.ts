import { AviGrade } from "../models/enums";
import { serverUrl } from "./serverUrl";
import { ApiResponseType } from "../models/apiResponse";
import { Feedback } from "../models/Feedback";

//TO DO; use the Feedback Type here 
export const createFeedback = async (
    text: string,
    calculatedAviGrade: AviGrade,
    feedbackAviGrade: AviGrade
): Promise<ApiResponseType<Feedback>> => {
    const feedback: Partial<Feedback> = {
        text,
        feedbackAviGrade,
        calculatedAviGrade
    };

    try {
        const response = await fetch(`${serverUrl}/api/feedback`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ feedback })
        });

        const data = await response.json();
        return { success: true, data: data };
    } catch (err) {
        if (err instanceof Error) {
            return { success: false, error: err.message };
        } else {
            return { success: false, error: "Error: Failed to send message to server." };
        }
    };
};

export const getAllFeedback = async () => {
    try {
        const response = await fetch(`${serverUrl}/api/feedback`, {
            method: 'GET',
        });

        const data = await response.json();
        return { success: true, data: data };
    } catch (err) {
        if (err instanceof Error) {
            return { success: false, error: err.message };
        } else {
            return { success: false, error: "Error: Failed to send message to server." };
        }
    };
}

export const deleteFeedback = async (feedbackId: Feedback["_id"]): Promise<ApiResponseType<Feedback>> => {
    try {
        const response = await fetch(`${serverUrl}/api/feedback/${feedbackId}`, {
            method: 'DELETE',
        });

        const data = await response.json();
        return { success: true, data: data };


    } catch (err) {
        if (err instanceof Error) {
            return { success: false, error: err.message };
        } else {
            return { success: false, error: "Error: Failed to send message to server." };
        }
    }
};

export const updateFeedback = async (feedbackId: Feedback["_id"], updatedData: Feedback): Promise<ApiResponseType<Feedback>> => {
    try {
        const response = await fetch(`${serverUrl}/api/feedback/${feedbackId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });

        const data = await response.json();
        return { success: true, data: data };

    } catch (err) {
        if (err instanceof Error) {
            return { success: false, error: err.message };
        } else {
            return { success: false, error: "Error: Failed to send message to server." };
        }
    }
};

