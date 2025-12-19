const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.post('/', (req, res) => {
    const { customer_name, phone, number_of_people } = req.body;

    if (!customer_name || !phone || !number_of_people) {
        return res.status(400).json({ 
            success: false, 
            message: 'All fields are required' 
        });
    }

    if (number_of_people < 1 || number_of_people > 50) {
        return res.status(400).json({ 
            success: false, 
            message: 'Number of people must be between 1 and 50' 
        });
    }

    const query = `INSERT INTO reservations (customer_name, phone, number_of_people) 
                   VALUES (?, ?, ?)`;

    db.run(query, [customer_name, phone, number_of_people], function(err) {
        if (err) {
            console.error('Error creating reservation:', err.message);
            return res.status(500).json({ 
                success: false, 
                message: 'Failed to create reservation' 
            });
        }

        res.status(201).json({ 
            success: true, 
            message: 'Table reserved successfully!',
            reservationId: this.lastID 
        });
    });
});

router.get('/', (req, res) => {
    const query = `SELECT * FROM reservations ORDER BY created_at DESC`;

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error fetching reservations:', err.message);
            return res.status(500).json({ 
                success: false, 
                message: 'Failed to fetch reservations' 
            });
        }

        res.json({ success: true, data: rows });
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    db.get(`SELECT * FROM reservations WHERE id = ?`, [id], (err, row) => {
        if (err) {
            return res.status(500).json({ 
                success: false, 
                message: 'Failed to fetch reservation' 
            });
        }

        if (!row) {
            return res.status(404).json({ 
                success: false, 
                message: 'Reservation not found' 
            });
        }

        res.json({ success: true, data: row });
    });
});

router.patch('/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
    
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ 
            success: false, 
            message: 'Invalid status' 
        });
    }

    db.run(`UPDATE reservations SET status = ? WHERE id = ?`, [status, id], function(err) {
        if (err) {
            return res.status(500).json({ 
                success: false, 
                message: 'Failed to update reservation status' 
            });
        }

        res.json({ 
            success: true, 
            message: 'Reservation status updated' 
        });
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    db.run(`DELETE FROM reservations WHERE id = ?`, [id], function(err) {
        if (err) {
            return res.status(500).json({ 
                success: false, 
                message: 'Failed to delete reservation' 
            });
        }

        res.json({ 
            success: true, 
            message: 'Reservation deleted' 
        });
    });
});

module.exports = router;

