import axios from 'axios';
import { Request, Response } from 'express';
import { querySystemPrompt, gptConfig } from '../utils/chatConfig';

const sendToChatGPT = (req: Request, res: Response) => {
    const text = req.body.text;
    const apiKey = process.env.OPENAI_API_KEY;
    const endpoint = "https://api.openai.com/v1/chat/completions"; 

    console.log('Chat GPT request recieved');

    axios.post(endpoint, {
        messages: [
            {
                role: "system",
                content: querySystemPrompt
            },
            {
                role: "user",
                content: text
            }
        ],
        ...gptConfig
    }, {
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.data && response.data.choices && response.data.choices.length > 0) {
            res.json({ message: response.data.choices[0].message.content });
        } else {
            res.status(500).json({ error: "Unexpected response from ChatGPT." });
        }
    })
    .catch(err => {
        res.status(500).json({ error: err.message });
    });
};

export { sendToChatGPT };
