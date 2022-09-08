// Create a express app with port 3000
const express = require('express');
const app = express();
const port = 3000;

// Create a route for the root path
app.get('/api/api', (req, res) => {
    res.send('Hello World!');
});

// Start the server
// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`);
// });

module.exports = app;