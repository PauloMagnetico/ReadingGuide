if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

import express from 'express';
import cors from 'cors';
import http from 'http';
import https from 'https';
import fs from 'fs';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { sendToChatGPT } from './controllers/chatController';
import { analyzeFrame } from './controllers/imageController';
import {
  deleteFeedback,
  processReviewedFeedback,
  updateFeedback,
  getAllFeedback,
  createFeedback
} from './controllers/feedbackController';
import { AviGrade } from './models/enums';

const dbUrl = process.env.DB_URL!

mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected", dbUrl);
});


const app = express();
app.use(cors());
app.use(express.json());

app.use(bodyParser.json( {limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit:50000 }));

app.get('/api/getEnums', (req, res) => {
  res.json(AviGrade);
});

app.delete('/api/feedback/:id', deleteFeedback)
app.post('/api/feedback/process', processReviewedFeedback);
app.put('/api/feedback/:id', updateFeedback)
app.get('/api/feedback', getAllFeedback)
app.post('/api/feedback', createFeedback);
app.post('/api/chat', sendToChatGPT);
app.post('/api/image', analyzeFrame);


app.get('/', (req, res) => {
  res.status(200).send('Server Running');
});

function createServer() {
  if (process.env.NODE_ENV === 'production') {
    return http.createServer(app);
  } else {
    const privateKey = fs.readFileSync('server.key', 'utf8');
    const certificate = fs.readFileSync('server.cert', 'utf8');
    const credentials = { key: privateKey, cert: certificate };
    return https.createServer(credentials, app);
  }
}

const server = createServer();
const PORT = process.env.PORT || 3000;

server.listen(PORT, (err?: Error | null) => {
  if (err) {
    console.error('Error starting server:', err);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});

