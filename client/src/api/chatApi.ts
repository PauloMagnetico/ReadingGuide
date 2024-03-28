import { serverUrl } from "./serverUrl";
import { ApiResponseType } from "../models/apiResponse";

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