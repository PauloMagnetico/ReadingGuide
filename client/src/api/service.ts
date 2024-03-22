import { AviGrade } from "../models/enums";

type ApiResponseType = {
    success: boolean;
    data?: any;
    error?: string;
};

const serverUrl = process.env.NODE_ENV === 'production' ? process.env.SERVER_URL : "https://192.168.0.120:3000"

export const sendToChatGPT = async (text: string): Promise<ApiResponseType> => {
    try {
        const response = await fetch(`${serverUrl}/api/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: text })
        });

        const data = await response.json();
        if (data && data.message) {
            return { success: true, data: data.message };
        } else {
            return { success: false, error: "Error: Unexpected response from server." };
        }
    } catch (err) {
        if (err instanceof Error) {
            return { success: false, error: err.message };
        } else {
            return { success: false, error: "Error: Failed to send message to server." };
        };
    };
};

export const extractTextFromImage = async (imageData: string): Promise<ApiResponseType> => {
    if (!imageData) {
        return { success: false, error: 'No image data provided' };
    };

    try {
        const response = await fetch(`${serverUrl}/api/image`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ imageData })
        });

        const data = await response.json();
        return { success: true, data: data };
    } catch (err) {
        if (err instanceof Error) {
            return { success: false, error: err.message };
        } else {
            return { success: false, error: "Error: Failed to send message to server." };
        };
    };
};

export const createFeedback = async (
    text: string,
    calculatedAviGrade: AviGrade,
    feedbackAviGrade: AviGrade
): Promise<ApiResponseType> => {
    const feedback = {
        text,
        feedbackAviGrade,
        calculatedAviGrade
    };
    if (!feedback) {
        return { success: false, error: 'feedback' };
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

