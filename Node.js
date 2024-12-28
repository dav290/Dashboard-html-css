const http = require('http');
const fs = require('fs');
const path = require('path');

// Create the server
const server = http.createServer((req, res) => {
    let filePath = '';

    // Set the file path based on the URL
    switch (req.url) {
        case '/':
            filePath = path.join(__dirname, 'index.html');
            break;
        case '/about':
            filePath = path.join(__dirname, 'about.html');
            break;
        case '/contact-me':
            filePath = path.join(__dirname, 'contact-me.html');
            break;
        default:
            filePath = path.join(__dirname, '404.html');
            break;
    }

    // Read the file and serve it
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            res.statusCode = 500;
            res.end('Server Error');
            return;
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
    });
});

// Listen on port 8080
server.listen(8080, () => {
    console.log('Server running at http://localhost:8080/');
});
