import { serverUrl } from "./serverUrl";

const ProcessReviewedFeedback = async (model: string) => {
    try {
        const response = await fetch(`${serverUrl}/api/feedback/process`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: model
            })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Process the response as a Blob
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `reviewed_feedback_${model}.jsonl`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
        console.error('Error downloading the file:', error);
    }
};

export default ProcessReviewedFeedback;