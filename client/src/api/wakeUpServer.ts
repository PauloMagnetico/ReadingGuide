import { serverUrl } from "./serverUrl";

export const wakeUpServer = async () => {
    try {
        const response = await fetch(`${serverUrl}/`);
        if (!response.ok) {
            throw new Error(`Server returned status ${response.status}`);
        }
        const result = await response.text();
        return { success: true, data: result };
    } catch (err) {
        if (err instanceof Error) {
            return { success: false, error: err.message };
        } else {
            return { success: false, error: "Error: Failed to send message to server." };
        }
    };
}
