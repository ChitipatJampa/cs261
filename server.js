const express = require('express');
const path = require('path');
const https = require('https'); // Import https for making API requests

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // Middleware to parse JSON request bodies

// Serve the Login.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Login.html'));
});

// Login endpoint to handle user authentication
app.post('/api/login', (req, res) => {
    const { username, password } = req.body; // Get username and password from the request body

    const accessToken = 'TUe0255672f1bbb086fb7b69e6223bd0df69a284b965180bb03b37dbbc52485b13a0774370730e671909c94a8d864c1449'; // Your access token

    const options = {
        method: 'POST',
        hostname: 'restapi.tu.ac.th',
        path: '/api/v1/auth/Ad/verify',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}` // Use Authorization header
        }
    };

    // Create the HTTPS request
    const reqApi = https.request(options, (apiRes) => {
        let chunks = []; // To store the response data

        apiRes.on('data', (chunk) => {
            chunks.push(chunk);
        });

        apiRes.on('end', () => {
            const body = Buffer.concat(chunks);
            res.json({ response: body.toString() }); // Send API response back to client
        });

        apiRes.on('error', (error) => {
            console.error('API Error:', error);
            res.status(500).json({ error: 'API request failed' });
        });
    });

    // Construct postData with the actual username and password
    const postData = JSON.stringify({
        UserName: username,
        PassWord: password
    });

    reqApi.write(postData);
    reqApi.end();
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
