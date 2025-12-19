const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.post('/', (req, res) => {
    const { name, phone, email, message } = req.body;

    if (!name || !phone || !email || !message) {
        return res.status(400).json({ 
            success: false, 
            message: 'All fields are required' 
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ 
            success: false, 
            message: 'Invalid email format' 
        });
    }

    const query = `INSERT INTO contacts (name, phone, email, message) 
                   VALUES (?, ?, ?, ?)`;

    db.run(query, [name, phone, email, message], function(err) {
        if (err) {
            console.error('Error saving contact:', err.message);
            return res.status(500).json({ 
                success: false, 
                message: 'Failed to send message' 
            });
        }

        res.status(201).json({ 
            success: true, 
            message: 'Message sent successfully!',
            contactId: this.lastID 
        });
    });
});

router.get('/', (req, res) => {
    const query = `SELECT * FROM contacts ORDER BY created_at DESC`;

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error fetching contacts:', err.message);
            return res.status(500).json({ 
                success: false, 
                message: 'Failed to fetch contacts' 
            });
        }

        res.json({ success: true, data: rows });
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    db.get(`SELECT * FROM contacts WHERE id = ?`, [id], (err, row) => {
        if (err) {
            return res.status(500).json({ 
                success: false, 
                message: 'Failed to fetch contact' 
            });
        }

        if (!row) {
            return res.status(404).json({ 
                success: false, 
                message: 'Contact not found' 
            });
        }

        res.json({ success: true, data: row });
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    db.run(`DELETE FROM contacts WHERE id = ?`, [id], function(err) {
        if (err) {
            return res.status(500).json({ 
                success: false, 
                message: 'Failed to delete contact' 
            });
        }

        res.json({ 
            success: true, 
            message: 'Contact deleted' 
        });
    });
});

module.exports = router;

