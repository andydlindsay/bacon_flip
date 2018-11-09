const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Application listening on port ${PORT}`);
});
