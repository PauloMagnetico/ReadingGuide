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
const testFilePath = 'testset.jsonl';

// Upload the JSONL file using fs.createReadStream()
const file = await openai.files.create({
  file: fs.createReadStream(jsonlFilePath),
  purpose: 'fine-tune'
});

const testFile = await openai.files.create({
  file: fs.createReadStream(testFilePath),
  purpose: 'fine-tune'
});

const fineTune = await openai.fineTuning.jobs.create({ 
  training_file: file.id, 
  validation_file: testFile.id,
  model: 'gpt-3.5-turbo' });

console.log(fineTune)

// List 10 fine-tuning jobs
//let page = await openai.fineTuning.jobs.list({ limit: 10 });

// Retrieve the state of a fine-tune
//let fineTune = await openai.fineTuning.jobs.retrieve('ftjob-abc123');

// Cancel a job
//let status = await openai.fineTuning.jobs.cancel('ftjob-abc123');

// List up to 10 events from a fine-tuning job
//let events = await openai.fineTuning.jobs.listEvents(fineTune.id, { limit: 10 });

// Delete a fine-tuned model (must be an owner of the org the model was created in)
//let model = await openai.models.delete('ft:gpt-3.5-turbo:acemeco:suffix:abc123');

