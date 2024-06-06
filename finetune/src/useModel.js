const OpenAI = require('openai');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Initialize OpenAI client with API key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const useModel = async(tekst) => {
    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "Dit is een chatbot die het AVI-leesniveau van teksten evalueert. De gebruiker zal een tekst verstrekken, en de chatbot zal reageren met een AVI-leesniveau uit de volgende lijst: ['AviStart', 'M3', 'E3', 'M4', 'E4', 'M5', 'E5', 'M6', 'E6', 'M7', 'E7', 'AviPlus']."
            },
            {
                role: "user",
                content: tekst
            }
        ],
        model: "ft:gpt-3.5-turbo-0125:personal::9X7VX4Be"
    });
    console.log(completion.choices[0]);
}

module.exports = { useModel };
