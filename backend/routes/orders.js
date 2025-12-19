const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.post('/', (req, res) => {
    const { customer_name, phone, address, items, total_price } = req.body;

    if (!customer_name || !phone || !address || !items || !total_price) {
        return res.status(400).json({ 
            success: false, 
            message: 'All fields are required' 
        });
    }

    const itemsJson = JSON.stringify(items);

    const query = `INSERT INTO orders (customer_name, phone, address, items, total_price) 
                   VALUES (?, ?, ?, ?, ?)`;

    db.run(query, [customer_name, phone, address, itemsJson, total_price], function(err) {
        if (err) {
            console.error('Error creating order:', err.message);
            return res.status(500).json({ 
                success: false, 
                message: 'Failed to create order' 
            });
        }

        res.status(201).json({ 
            success: true, 
            message: 'Order placed successfully!',
            orderId: this.lastID 
        });
    });
});

router.get('/', (req, res) => {
    const query = `SELECT * FROM orders ORDER BY created_at DESC`;

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error fetching orders:', err.message);
            return res.status(500).json({ 
                success: false, 
                message: 'Failed to fetch orders' 
            });
        }

        const orders = rows.map(row => ({
            ...row,
            items: JSON.parse(row.items)
        }));

        res.json({ success: true, data: orders });
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    db.get(`SELECT * FROM orders WHERE id = ?`, [id], (err, row) => {
        if (err) {
            return res.status(500).json({ 
                success: false, 
                message: 'Failed to fetch order' 
            });
        }

        if (!row) {
            return res.status(404).json({ 
                success: false, 
                message: 'Order not found' 
            });
        }

        res.json({ 
            success: true, 
            data: { ...row, items: JSON.parse(row.items) } 
        });
    });
});

router.patch('/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'confirmed', 'preparing', 'delivered', 'cancelled'];
    
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ 
            success: false, 
            message: 'Invalid status' 
        });
    }

    db.run(`UPDATE orders SET status = ? WHERE id = ?`, [status, id], function(err) {
        if (err) {
            return res.status(500).json({ 
                success: false, 
                message: 'Failed to update order status' 
            });
        }

        res.json({ 
            success: true, 
            message: 'Order status updated' 
        });
    });
});

module.exports = router;

