const axios = require('axios');

exports.sendToChatGPT = (req, res) => {
    const text = req.body.text;
    const apiKey = process.env.OPENAI_API_KEY;
    const endpoint = "https://api.openai.com/v1/chat/completions"; 

    console.log('request recieved');

    axios.post(endpoint, {
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "user",
                content: `Antwoord enkel met een antwoord uit deze lijst ['AviStart', 'M3', 'E3', 'M4', 'E4', 'M5', 'E5', 'M6', 'E6', 'M7', 'E7', 'AviPlus']. avi-leesniveau van volgende tekst: "${text}"`
            }
        ],
        temperature: 0,
        max_tokens: 20,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
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
