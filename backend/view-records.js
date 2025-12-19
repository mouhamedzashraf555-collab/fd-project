const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database/restaurant.db');
const db = new sqlite3.Database(dbPath);

console.log('═══════════════════════════════════════════');
console.log('📊 NILE BITES DATABASE RECORDS');
console.log('═══════════════════════════════════════════\n');

db.all("SELECT * FROM orders ORDER BY created_at DESC", [], (err, rows) => {
    if (err) {
        console.error('Error fetching orders:', err);
        return;
    }
    
    console.log('🛍️  ORDERS (' + rows.length + ' total)');
    console.log('─────────────────────────────────────────');
    
    if (rows.length === 0) {
        console.log('No orders yet.\n');
    } else {
        rows.forEach((row) => {
            console.log(`\n📦 Order #${row.id}`);
            console.log(`   Customer: ${row.customer_name}`);
            console.log(`   Phone: ${row.phone}`);
            console.log(`   Address: ${row.address}`);
            
            try {
                const items = JSON.parse(row.items);
                console.log(`   Items:`);
                items.forEach(item => {
                    console.log(`      - ${item.name} x${item.quantity} @ ${item.price} EGP`);
                });
            } catch (e) {
                console.log(`   Items: ${row.items}`);
            }
            
            console.log(`   Total: ${row.total_price} EGP`);
            console.log(`   Status: ${row.status}`);
            console.log(`   Date: ${row.created_at}`);
        });
        console.log('');
    }
    
    db.all("SELECT * FROM reservations ORDER BY created_at DESC", [], (err, rows) => {
        if (err) {
            console.error('Error fetching reservations:', err);
            return;
        }
        
        console.log('\n🪑 RESERVATIONS (' + rows.length + ' total)');
        console.log('─────────────────────────────────────────');
        
        if (rows.length === 0) {
            console.log('No reservations yet.\n');
        } else {
            rows.forEach((row) => {
                console.log(`\n🍽️  Reservation #${row.id}`);
                console.log(`   Customer: ${row.customer_name}`);
                console.log(`   Phone: ${row.phone}`);
                console.log(`   Party Size: ${row.number_of_people} people`);
                console.log(`   Status: ${row.status}`);
                console.log(`   Date: ${row.created_at}`);
            });
            console.log('');
        }
        
        db.all("SELECT * FROM contacts ORDER BY created_at DESC", [], (err, rows) => {
            if (err) {
                console.error('Error fetching contacts:', err);
                return;
            }
            
            console.log('\n✉️  CONTACT MESSAGES (' + rows.length + ' total)');
            console.log('─────────────────────────────────────────');
            
            if (rows.length === 0) {
                console.log('No messages yet.\n');
            } else {
                rows.forEach((row) => {
                    console.log(`\n📧 Message #${row.id}`);
                    console.log(`   From: ${row.name}`);
                    console.log(`   Phone: ${row.phone}`);
                    console.log(`   Email: ${row.email}`);
                    console.log(`   Message: ${row.message}`);
                    console.log(`   Date: ${row.created_at}`);
                });
                console.log('');
            }
            
            console.log('═══════════════════════════════════════════');
            console.log('✅ Database viewing complete!');
            console.log('═══════════════════════════════════════════\n');
            
            db.close();
        });
    });
});

