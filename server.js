const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Claude API endpoint
const CLAUDE_API_URL = 'https://api.claude.ai/v1/chat/completions';

// Route to interact with Claude API
app.post('/ask-claude', async (req, res) => {
    const userInput = req.body.prompt;
    try {
        const response = await axios.post(CLAUDE_API_URL, {
            prompt: userInput,
            max_tokens: 150
        }, {
            headers: { 'Authorization': `Bearer YOUR_API_KEY` }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error communicating with Claude API:', error);
        res.status(500).send('Error communicating with Claude API');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
