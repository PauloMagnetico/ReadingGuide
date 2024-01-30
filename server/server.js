if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const http = require('http');
const https = require('https');
const fs = require('fs');
const mongoose = require('mongoose');
const chatController = require('./controllers/chatController');
const imageController = require('./controllers/imageController');
const feedbackController = require('./controllers/feedbackController')
const { aviGrades } = require('./models/enums')

const dbUrl = process.env.DB_URL || 'mongodb://mongodb:27017/feedbackData'

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/getEnums', (req, res) => {
  res.json(aviGrades);
});

app.delete('/api/feedback/:id', feedbackController.deleteFeedback)
app.post('/api/feedback/process', feedbackController.processReviewedFeedback);
app.put('/api/feedback/:id', feedbackController.updateFeedback)
app.get('/api/feedback', feedbackController.getAllFeedback)
app.post('/api/feedback', feedbackController.createFeedback);
app.post('/api/chat', chatController.sendToChatGPT);
app.post('/api/image', imageController.analyzeFrame);


app.get('/', (req, res) => {
    res.send('Hello from Express.js');
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

server.listen(PORT, '0.0.0.0', (err) => {
    if (err) {
      console.error('Error starting server:', err);
    } else {
      console.log(`Server is running on port ${PORT}`);
    }
  });
  