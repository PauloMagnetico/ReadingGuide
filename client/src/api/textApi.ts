import { serverUrl } from "./serverUrl";

type ApiResponseType = {
    success: boolean;
    data?: any;
    error?: string;
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