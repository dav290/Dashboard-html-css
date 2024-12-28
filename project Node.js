const express = require('express');
const app = express();

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Array to store messages
const messages = [
  { text: 'Hi there!', user: 'Amando', added: new Date() },
  { text: 'Hello World!', user: 'Charles', added: new Date() }
];

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Index route (display messages)
app.get('/', (req, res) => {
  res.render('index', { title: 'Mini Messageboard', messages: messages });
});

// New message form route
app.get('/new', (req, res) => {
  res.render('form', { title: 'New Message' });
});

// Post route for adding a new message
app.post('/new', (req, res) => {
  const { messageUser, messageText } = req.body;
  messages.push({ text: messageText, user: messageUser, added: new Date() });
  res.redirect('/');
});

// Start the server
app.listen(8080, () => {
  console.log('Server running at http://localhost:8080');
});
