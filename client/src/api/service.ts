import { AviGrade } from "../models/enums";

type ApiResponseType = {
    success: boolean;
    data?: any;
    error?: string;
};

//the way to import environment variables in Vite
console.log("debugger")
const serverUrl = import.meta.env.PROD ? import.meta.env.VITE_SERVER_URL : "https://192.168.0.120:3000";
console.log("serverUrl", serverUrl);
console.log("import.meta.env", import.meta.env);
console.log("import.meta.env.PROD", import.meta.env.PROD);

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

