export const sendToChatGPT = async (text) => {
    const serverUrl = 'https://192.168.0.120:3000/api/chat';
    try {
        const response = await fetch(serverUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: text })
        });

        const data = await response.json();
        if (data && data.message) {
            return { success: true, message: data.message };
        } else {
            return { success: false, error: "Error: Unexpected response from server." };
        }
    } catch (err) {
        return { success: false, error: err.message };
    };
};

export const extractTextFromImage = async (imageData) => {
    const serverUrl = 'https://192.168.0.120:3000/api/image';
    if (!imageData) {
        return { success: false, error: 'No image data provided' };
    };

    try {
        const response = await fetch(serverUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ imageData })
        });

        const data = await response.json();
        return { success: true, data: data };
    } catch (err) {
        return { success: false, error: err.message };
    }
};

export const createFeedback = async (text, calculatedAviGrade, feedbackAviGrade) => {
    const feedback = {
        text,
        feedbackAviGrade,
        calculatedAviGrade
    };
    const serverUrl = 'https://192.168.0.120:3000/api/feedback';
    if (!feedback) {
        return { success: false, error: 'feedback' };
    };

    try {
        const response = await fetch(serverUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ feedback })
        });

        const data = await response.json();
        return { success: true, data: data };
    } catch (err) {
        return { success: false, error: err.message };
    }
};

