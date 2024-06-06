import fs from 'fs';
import OpenAI from 'openai';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Initialize OpenAI client with API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Path to your JSONL file
const jsonlFilePath = 'reviewed_feedback.jsonl';

// Upload the JSONL file using fs.createReadStream()
const file = await openai.files.create({
  file: fs.createReadStream(jsonlFilePath),
  purpose: 'fine-tune'
});

const fineTune = await openai.fineTuning.jobs.create({ training_file: file.id, model: 'gpt-3.5-turbo' });

console.log(fineTune)



