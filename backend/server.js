require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

const dbDir = path.join(__dirname, 'database');
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir);
}

const db = require('./config/database');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Log all requests for debugging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Serve static files from project root
app.use(express.static(path.join(__dirname, '../')));

// API Routes
const ordersRoute = require('./routes/orders');
const reservationsRoute = require('./routes/reservations');
const contactsRoute = require('./routes/contacts');

app.use('/api/orders', ordersRoute);
app.use('/api/reservations', reservationsRoute);
app.use('/api/contacts', contactsRoute);

app.get('/api/health', (req, res) => {
    res.json({ 
        success: true, 
        message: 'Nile Bites API is running',
        timestamp: new Date().toISOString()
    });
});

// Debug route to check file paths
app.get('/api/debug', (req, res) => {
    const projectRoot = path.join(__dirname, '../');
    res.json({
        success: true,
        paths: {
            __dirname: __dirname,
            projectRoot: projectRoot,
            htmlFolder: path.join(projectRoot, 'Html'),
            jsFolder: path.join(projectRoot, 'java_script'),
            homeHtmlExists: fs.existsSync(path.join(projectRoot, 'Html/home.html')),
            apiJsExists: fs.existsSync(path.join(projectRoot, 'java_script/api.js')),
            formsJsExists: fs.existsSync(path.join(projectRoot, 'java_script/forms.js'))
        }
    });
});

// Home route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Html/home.html'));
});

// 404 handler - only for non-existent routes
app.use((req, res) => {
    console.log('404 - File not found:', req.url);
    res.status(404).json({ 
        success: false, 
        message: 'Route not found',
        requestedUrl: req.url
    });
});

app.use((err, req, res, next) => {
    console.error('Server error:', err.stack);
    res.status(500).json({ 
        success: false, 
        message: 'Internal server error' 
    });
});

app.listen(PORT, () => {
    console.log(`╔════════════════════════════════════════╗`);
    console.log(`║  🍴 Nile Bites Backend Server         ║`);
    console.log(`║  ✓ Server running on port ${PORT}       ║`);
    console.log(`║  ✓ Database connected                 ║`);
    console.log(`║  ✓ API: http://localhost:${PORT}/api    ║`);
    console.log(`╚════════════════════════════════════════╝`);
});

process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err.message);
        } else {
            console.log('\n✓ Database connection closed');
        }
        process.exit(0);
    });
});

