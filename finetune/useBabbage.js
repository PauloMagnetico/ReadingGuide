import OpenAI from 'openai';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();


// Initialize OpenAI client with API key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const useModel = async (tekst) => {
    const completion = await openai.completions.create({
        prompt: `Dit is een chatbot die het AVI-leesniveau van teksten evalueert. 
                De gebruiker zal een tekst verstrekken, en de chatbot zal reageren 
                met een AVI-leesniveau uit de volgende lijst: 
                ['AviStart', 'M3', 'E3', 'M4', 'E4', 'M5', 'E5', 'M6', 'E6', 'M7', 'E7', 'AviPlus'].
                \n\nTekst: ${tekst}
                \nAVI-leesniveau:`,
        model: "ft:babbage-002:personal:cheapskate:9XleTtHJ",
        max_tokens: 100 // Adjust as needed based on your expected response length
    });
    // return completion.choices[0].text.trim();
    console.log(completion.choices[0].text.trim())
};

useModel('ander voorbeeld babbage')

// // module.exports = { useModel };
