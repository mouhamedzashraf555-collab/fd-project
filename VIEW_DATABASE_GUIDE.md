# 📊 How to View Database Records

## ✅ Success Message Now Lasts 5 Seconds (Changed from 3 seconds)

---

## 🗄️ Method 1: Using SQLite Command Line (Recommended)

### Step 1: Navigate to Database Folder
```bash
cd C:\Users\Softlaptop\Desktop\fd-project\backend\database
```

### Step 2: Open Database
```bash
sqlite3 restaurant.db
```

### Step 3: View Your Data

**View all orders:**
```sql
SELECT * FROM orders;
```

**View all reservations:**
```sql
SELECT * FROM reservations;
```

**View all contact messages:**
```sql
SELECT * FROM contacts;
```

**View latest order:**
```sql
SELECT * FROM orders ORDER BY created_at DESC LIMIT 1;
```

**Count total orders:**
```sql
SELECT COUNT(*) FROM orders;
```

**View orders with formatted output:**
```sql
.mode column
.headers on
SELECT id, customer_name, phone, total_price, status, created_at FROM orders;
```

### Step 4: Exit SQLite
```sql
.exit
```

---

## 🗄️ Method 2: Using PowerShell (Quick One-Liner)

**View all orders:**
```powershell
cd C:\Users\Softlaptop\Desktop\fd-project\backend\database
sqlite3 restaurant.db "SELECT * FROM orders;"
```

**View with pretty format:**
```powershell
sqlite3 restaurant.db ".mode column" ".headers on" "SELECT * FROM orders;"
```

**View latest 5 orders:**
```powershell
sqlite3 restaurant.db "SELECT id, customer_name, total_price, created_at FROM orders ORDER BY created_at DESC LIMIT 5;"
```

---

## 🌐 Method 3: Using Node.js Script

I'll create a simple script for you to view records easily!

### Create this file: `backend/view-records.js`

```javascript
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database/restaurant.db');
const db = new sqlite3.Database(dbPath);

console.log('═══════════════════════════════════════════');
console.log('📊 NILE BITES DATABASE RECORDS');
console.log('═══════════════════════════════════════════\n');

// View Orders
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
        rows.forEach((row, index) => {
            console.log(`\n📦 Order #${row.id}`);
            console.log(`   Customer: ${row.customer_name}`);
            console.log(`   Phone: ${row.phone}`);
            console.log(`   Address: ${row.address}`);
            console.log(`   Items: ${row.items}`);
            console.log(`   Total: ${row.total_price} EGP`);
            console.log(`   Status: ${row.status}`);
            console.log(`   Date: ${row.created_at}`);
        });
        console.log('');
    }
    
    // View Reservations
    db.all("SELECT * FROM reservations ORDER BY created_at DESC", [], (err, rows) => {
        if (err) {
            console.error('Error fetching reservations:', err);
            return;
        }
        
        console.log('🪑 RESERVATIONS (' + rows.length + ' total)');
        console.log('─────────────────────────────────────────');
        
        if (rows.length === 0) {
            console.log('No reservations yet.\n');
        } else {
            rows.forEach((row, index) => {
                console.log(`\n🍽️  Reservation #${row.id}`);
                console.log(`   Customer: ${row.customer_name}`);
                console.log(`   Phone: ${row.phone}`);
                console.log(`   Party Size: ${row.number_of_people} people`);
                console.log(`   Status: ${row.status}`);
                console.log(`   Date: ${row.created_at}`);
            });
            console.log('');
        }
        
        // View Contacts
        db.all("SELECT * FROM contacts ORDER BY created_at DESC", [], (err, rows) => {
            if (err) {
                console.error('Error fetching contacts:', err);
                return;
            }
            
            console.log('✉️  CONTACT MESSAGES (' + rows.length + ' total)');
            console.log('─────────────────────────────────────────');
            
            if (rows.length === 0) {
                console.log('No messages yet.\n');
            } else {
                rows.forEach((row, index) => {
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
            db.close();
        });
    });
});
```

### Then run:
```bash
cd backend
node view-records.js
```

---

## 🖥️ Method 4: Using DB Browser (GUI Tool)

### Step 1: Download DB Browser for SQLite
- Go to: https://sqlitebrowser.org/
- Download and install for Windows

### Step 2: Open Your Database
1. Open DB Browser for SQLite
2. Click "Open Database"
3. Navigate to: `C:\Users\Softlaptop\Desktop\fd-project\backend\database\restaurant.db`
4. Click "Open"

### Step 3: Browse Your Data
1. Click "Browse Data" tab
2. Select table from dropdown:
   - `orders`
   - `reservations`
   - `contacts`
   - `cart_items`
3. View, edit, filter, and export your data!

---

## 🚀 Method 5: Quick Command (Add to package.json)

### Update `backend/package.json`:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "node test-api.js",
    "view-db": "node view-records.js"
  }
}
```

### Then just run:
```bash
cd backend
npm run view-db
```

---

## 📊 Common SQL Queries

### Orders:

**View order with items details:**
```sql
SELECT 
    id,
    customer_name,
    phone,
    address,
    items,
    total_price,
    status,
    created_at
FROM orders 
WHERE id = 1;
```

**View orders from today:**
```sql
SELECT * FROM orders 
WHERE DATE(created_at) = DATE('now', 'localtime');
```

**View total revenue:**
```sql
SELECT SUM(total_price) as total_revenue FROM orders;
```

**View orders by status:**
```sql
SELECT COUNT(*), status FROM orders GROUP BY status;
```

### Reservations:

**View upcoming reservations:**
```sql
SELECT * FROM reservations 
WHERE status = 'pending' OR status = 'confirmed'
ORDER BY created_at DESC;
```

**View by party size:**
```sql
SELECT * FROM reservations 
WHERE number_of_people >= 5
ORDER BY number_of_people DESC;
```

### Contacts:

**View recent messages:**
```sql
SELECT * FROM contacts 
ORDER BY created_at DESC 
LIMIT 10;
```

**Search by name:**
```sql
SELECT * FROM contacts 
WHERE name LIKE '%Test%';
```

---

## 🎯 Quick Reference Card

| Task | Command |
|------|---------|
| Open DB | `cd backend/database && sqlite3 restaurant.db` |
| View orders | `SELECT * FROM orders;` |
| View reservations | `SELECT * FROM reservations;` |
| View contacts | `SELECT * FROM contacts;` |
| Count orders | `SELECT COUNT(*) FROM orders;` |
| Latest order | `SELECT * FROM orders ORDER BY created_at DESC LIMIT 1;` |
| Exit SQLite | `.exit` |
| Pretty format | `.mode column` then `.headers on` |

---

## 💡 Pro Tips

### Tip 1: Pretty Output
```sql
.mode column
.headers on
.width 5 15 15 30 10 10 20
SELECT * FROM orders;
```

### Tip 2: Save Output to File
```bash
sqlite3 restaurant.db "SELECT * FROM orders;" > orders.txt
```

### Tip 3: Export to CSV
```sql
.mode csv
.output orders.csv
SELECT * FROM orders;
.output stdout
```

### Tip 4: Real-time Monitoring
Keep SQLite open and re-run query after each order:
```sql
SELECT * FROM orders ORDER BY created_at DESC LIMIT 5;
```

---

## 🧪 Testing Your Database

### Test 1: Place an Order
1. Go to website
2. Add items to cart
3. Submit order
4. Run: `sqlite3 restaurant.db "SELECT * FROM orders;"`
5. You should see your order!

### Test 2: Book a Table
1. Go to table reservation
2. Submit form
3. Run: `sqlite3 restaurant.db "SELECT * FROM reservations;"`
4. You should see your reservation!

### Test 3: Send Contact Message
1. Go to contact page
2. Submit form
3. Run: `sqlite3 restaurant.db "SELECT * FROM contacts;"`
4. You should see your message!

---

## ✅ Success Checklist

- [ ] Can open database with SQLite
- [ ] Can view orders table
- [ ] Can view reservations table
- [ ] Can view contacts table
- [ ] Can see your test order
- [ ] Data persists after server restart
- [ ] Can run SQL queries
- [ ] Understand basic SQL commands

---

## 🆘 Troubleshooting

### "sqlite3 is not recognized"

**Solution 1: Download SQLite**
1. Go to: https://www.sqlite.org/download.html
2. Download "sqlite-tools-win32-x86-*.zip"
3. Extract to `C:\sqlite`
4. Add `C:\sqlite` to Windows PATH

**Solution 2: Use Node.js script instead**
```bash
cd backend
node view-records.js
```

### Can't find database file

**Check if it exists:**
```bash
cd C:\Users\Softlaptop\Desktop\fd-project\backend\database
dir
```

You should see `restaurant.db`

### Database is locked

**Solution:** Close any open connections:
1. Stop the server (Ctrl+C)
2. Close DB Browser if open
3. Try again

---

**Now you can easily monitor all your orders, reservations, and messages!** 📊

Choose the method that works best for you!

