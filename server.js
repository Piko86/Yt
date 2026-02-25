const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Serve static files from public directory
app.use(express.static('public'));

// Ensure Apk directory exists
const apkDir = path.join(__dirname, 'Apk');
if (!fs.existsSync(apkDir)) {
    fs.mkdirSync(apkDir);
}

// Download endpoint for APK
app.get('/download', (req, res) => {
    const apkPath = path.join(__dirname, 'Apk', 'Youtube Premium.apk');
    
    // Check if file exists
    if (fs.existsSync(apkPath)) {
        res.download(apkPath, 'Youtube-Premium.apk', (err) => {
            if (err) {
                console.error('Download error:', err);
                res.status(500).send('Error downloading file');
            }
        });
    } else {
        res.status(404).send('APK file not found. Please make sure the file exists in /Apk/Youtube Premium.apk');
    }
});

// Serve main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Make sure to place your APK file in: ${path.join(__dirname, 'Apk', 'Youtube Premium.apk')}`);
});
