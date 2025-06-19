const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;
const FILE_PATH = './feedback.json';

app.use(cors());
app.use(bodyParser.json());

// Serve static HTML
app.use(express.static('public'));

// Read existing feedback
function readFeedback() {
  if (!fs.existsSync(FILE_PATH)) return [];
  const data = fs.readFileSync(FILE_PATH);
  return JSON.parse(data);
}

function writeFeedback(data) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
}

app.get('/feedback', (req, res) => {
  const feedback = readFeedback();
  res.json(feedback);
});

app.post('/feedback', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const feedback = readFeedback();
  feedback.push({ name, email, message, timestamp: new Date().toISOString() });
  writeFeedback(feedback);

  res.status(201).json({ message: "Feedback submitted" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
