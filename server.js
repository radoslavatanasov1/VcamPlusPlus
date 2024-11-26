const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config(); // Load environment variables from .env

const app = express();
const port = 3000;

// Load Telegram Bot Token and Chat ID from environment variables
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Check if the required environment variables are set
if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
  console.error('Error: TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID must be set in the .env file.');
  process.exit(1);
}

// Initialize Telegram Bot
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN);

// Middleware for parsing JSON requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static('public'));

// Endpoint to handle form submission
app.post('/submit', async (req, res) => {
  const { name, email, category } = req.body;
  const userIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  if (!name || !email || !category) {
    return res.status(400).json({ error: 'Name, email, and category are required.' });
  }

  // Message to be sent to Telegram with emojis, user IP, and selected category
  const message = `🌟 *New Submission Received!* 🌟\n\n🧑‍💻 *Name:* ${name}\n📧 *Email:* ${email}\n📂 *Category:* ${category}\n🌍 *IP Address:* ${userIP}\n\nThank you for your submission! 🎉`;

  try {
    // Send message to Telegram
    await bot.sendMessage(TELEGRAM_CHAT_ID, message, { parse_mode: 'Markdown' });

    // Respond to the frontend
    res.status(200).json({ message: 'Details sent to Telegram.' });
  } catch (error) {
    console.error('Error sending message to Telegram:', error.message);
    res.status(500).json({ error: 'Failed to send details to Telegram.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
