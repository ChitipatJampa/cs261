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
    const { UserName, PassWord } = req.body; // Get username and password from the request body

    const accessToken = 'TU339d2e1ee4f2a55d9cc7704722e4a616e1652040e387aa40f406d83ed202ffdb23461f13e44bffc0aa5b315ce7ecfa53'; // Your access token

    const options = {
        method: 'POST',
        hostname: 'restapi.tu.ac.th',
        path: '/api/v1/auth/Ad/verify',
        headers: {
            'Content-Type': 'application/json',
            'Application-Key': accessToken
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
            const jsonResponse = JSON.parse(body.toString()); // Parse JSON response from API
            
            // Send a structured response back to the client
            if (jsonResponse.status) {
                res.json({
                    username: jsonResponse.username,
                    displayNameTH: jsonResponse.displayname_th,
                    displayNameEN: jsonResponse.displayname_en,
                    email: jsonResponse.email,
                    department: jsonResponse.department,
                    faculty: jsonResponse.faculty,
                });
            } else {
                res.json({ error: jsonResponse.message || "Login failed." });
            }
        });

        apiRes.on('error', (error) => {
            console.error('API Error:', error);
            res.status(500).json({ error: 'API request failed' });
        });
    });

    // Construct postData with the actual username and password
    const postData = JSON.stringify({
        UserName: UserName,
        PassWord: PassWord
    });

    reqApi.write(postData);
    reqApi.end();
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
