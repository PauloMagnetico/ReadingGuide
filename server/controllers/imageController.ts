import axios from 'axios';
import { Request, Response } from "express";

const analyzeFrame = (req: Request, res: Response) => {
    const imageData = req.body.imageData;
    const apiKey = process.env.GOOGLE_VISION_API_KEY;
    const endpoint = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

    const requestData = {
        "requests": [
            {
                "image": {
                    "content": imageData.split('base64,')[1]
                },
                "features": [
                    {
                        "type": "TEXT_DETECTION",
                    }
                ]
            }
        ]
    };

    axios.post(endpoint, requestData)
        .then(response => {
            res.json(response.data);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
};

export { analyzeFrame };
