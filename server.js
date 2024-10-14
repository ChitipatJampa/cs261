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
app.post('/api/Login', (req, res) => {
    const { username, password } = req.body; // Get username and password from the request body

    const accessToken = 'TU2809d38206a0c3cccf91f6c89a3ba3af180b309a12b23087c7b481c48f37c3ef501d2f1a2c73004fbe8a618341b5de66'; //my access token

    const options = {
        method: 'POST',
        hostname: 'restapi.tu.ac.th',
        path: '/api/v1/auth/Ad/verify',
        headers: {
            'Content-Type': 'application/json',
            'Application-Key': `${accessToken}` 
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
