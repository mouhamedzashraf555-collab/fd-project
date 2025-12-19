# ⚡ Quick Start Guide

Get up and running in 3 minutes!

## 🏃 Fast Setup

```bash
# 1. Navigate to backend folder
cd backend

# 2. Install dependencies
npm install

# 3. Start the server
npm start
```

## 🌐 Access the Website

Open your browser and go to:
```
http://localhost:3000
```

That's it! 🎉

## 🧪 Quick Test

1. **Browse Menu**: Click on "Eastern food🍲"
2. **Add to Cart**: Click "Add to cart" on any item
3. **View Cart**: Click the "Cart" button
4. **Place Order**: Click "Delivery" and fill the form
5. **Submit**: Click "Send"

You should see: ✅ "Order placed successfully!"

## 📁 What Was Created?

After first run, you'll have:
```
backend/
└── database/
    └── restaurant.db    # SQLite database with your data
```

## 🔍 View Your Data

```bash
cd backend/database
sqlite3 restaurant.db
```

```sql
SELECT * FROM orders;
SELECT * FROM reservations;
SELECT * FROM contacts;
```

## ⚙️ Common Commands

```bash
# Start server
npm start

# Start with auto-reload
npm run dev

# Check if server is running
curl http://localhost:3000/api/health

# Stop server
Ctrl + C
```

## 🎯 Key Features to Test

✅ **Shopping Cart** - Add/remove items, quantities  
✅ **Delivery Orders** - Submit food orders  
✅ **Table Reservations** - Book tables  
✅ **Contact Form** - Send messages  
✅ **Persistent Cart** - Refresh page, cart remains  

## 🐛 Quick Fixes

**Server won't start?**
```bash
# Kill any process on port 3000
npx kill-port 3000
npm start
```

**API not connecting?**
- Check backend is running: `curl http://localhost:3000/api/health`
- Open browser console (F12) for errors

## 📚 More Help

- **Full Installation**: See `INSTALLATION.md`
- **API Documentation**: See `backend/README.md`
- **Project Overview**: See `README.md`

---

**Need help?** Check the troubleshooting section in `INSTALLATION.md`

