# 🔧 Troubleshooting: "Route not found" Error

## ❌ The Error
```json
{"success":false,"message":"Route not found"}
```

---

## 🎯 Common Causes & Solutions

### 1. ⚠️ Accessing Routes Directly in Browser

**Problem:** Typing URLs like these in your browser:
- ❌ `http://localhost:3000/orders`
- ❌ `http://localhost:3000/reservations`
- ❌ `http://localhost:3000/contacts`

**Solution:** These are **API endpoints**, not web pages. They should be accessed through JavaScript, not directly in the browser.

**Correct URLs for browsing:**
- ✅ `http://localhost:3000` (Home page)
- ✅ `http://localhost:3000/Html/home.html`
- ✅ `http://localhost:3000/Html/eastern_food.html`
- ✅ `http://localhost:3000/Html/contact.html`

**API endpoints (for JavaScript only):**
- ✅ `http://localhost:3000/api/orders`
- ✅ `http://localhost:3000/api/reservations`
- ✅ `http://localhost:3000/api/contacts`

---

### 2. 🚫 Opening HTML Files Directly

**Problem:** Double-clicking HTML files or using `file://` protocol
- ❌ `file:///C:/Users/.../fd-project/Html/home.html`

**Why it fails:** Browser security blocks API calls from `file://` to `http://`

**Solution:** Always access through the server:
```bash
# Make sure server is running
cd backend
npm start

# Then open in browser:
http://localhost:3000
```

---

### 3. 📄 Missing `/api/` Prefix

**Problem:** Calling endpoints without the `/api/` prefix

**Wrong:**
```javascript
fetch('http://localhost:3000/orders')  // ❌
```

**Correct:**
```javascript
fetch('http://localhost:3000/api/orders')  // ✅
```

**Check:** Make sure `java_script/api.js` has:
```javascript
const API_BASE_URL = 'http://localhost:3000/api';
```

---

### 4. 🔌 Server Not Running

**Problem:** Backend server is stopped or crashed

**Check if server is running:**
```bash
# Windows
netstat -ano | findstr :3000

# Mac/Linux
lsof -i :3000
```

**Solution:** Start the server:
```bash
cd backend
npm start
```

You should see:
```
╔════════════════════════════════════════╗
║  🍴 Nile Bites Backend Server         ║
║  ✓ Server running on port 3000        ║
╚════════════════════════════════════════╝
```

---

### 5. 📜 Scripts Not Loaded

**Problem:** `api.js` or `forms.js` not loaded in HTML

**Check your HTML files have these scripts:**

```html
<script src="../java_script/api.js"></script>
<script src="../java_script/forms.js"></script>
<script src="../java_script/script.js"></script>
```

**Files that need these:**
- `Html/Delivery.html` ✅
- `Html/table reservation.html` ✅
- `Html/contact.html` ✅

---

## 🧪 Quick Test

### Test 1: Check Server Health

Open this in your browser:
```
http://localhost:3000/api/health
```

**Expected result:**
```json
{
  "success": true,
  "message": "Nile Bites API is running",
  "timestamp": "2024-12-19T..."
}
```

**If you see:** `{"success":false,"message":"Route not found"}`
- Your server might not be running
- Or you're using wrong URL

---

### Test 2: Use Test Page

I created a test page for you:
```
http://localhost:3000/Html/test-api.html
```

Click the buttons to test each endpoint!

---

### Test 3: Browser Console

1. Open any page (e.g., `http://localhost:3000`)
2. Press **F12** to open Developer Tools
3. Go to **Console** tab
4. Type:
```javascript
fetch('http://localhost:3000/api/health')
  .then(r => r.json())
  .then(d => console.log(d));
```
5. Press Enter

**You should see:**
```javascript
{success: true, message: "Nile Bites API is running", ...}
```

---

## 📋 Step-by-Step Verification

Follow these steps in order:

### Step 1: Verify Server
```bash
cd backend
npm start
```
**Expected:** Server starts without errors

### Step 2: Test Health Endpoint
Open in browser:
```
http://localhost:3000/api/health
```
**Expected:** JSON with `"success": true`

### Step 3: Test Frontend
Open in browser:
```
http://localhost:3000
```
**Expected:** Home page loads

### Step 4: Test Forms
1. Go to a food category
2. Add items to cart
3. Click "Delivery"
4. Fill the form
5. Click "Send"

**Expected:** Green notification "Order placed successfully!"

---

## 🔍 Debugging Checklist

- [ ] Backend server is running (`npm start` in backend folder)
- [ ] No errors in terminal where server is running
- [ ] Accessing pages through `http://localhost:3000` (not `file://`)
- [ ] `api.js` file exists in `java_script/` folder
- [ ] `forms.js` file exists in `java_script/` folder
- [ ] HTML files include the script tags
- [ ] Browser console (F12) shows no errors
- [ ] Health endpoint works: `http://localhost:3000/api/health`

---

## 🚨 Still Not Working?

### Check Backend Terminal

Look for errors like:
```
Error: Cannot find module './routes/orders'
Error: EADDRINUSE (port already in use)
SyntaxError: ...
```

### Check Browser Console (F12)

Look for errors like:
```
Failed to fetch
CORS error
404 Not Found
Unexpected token < in JSON
```

### Verify File Structure

Make sure you have:
```
fd-project/
├── backend/
│   ├── server.js
│   ├── routes/
│   │   ├── orders.js
│   │   ├── reservations.js
│   │   └── contacts.js
│   └── config/
│       └── database.js
└── java_script/
    ├── api.js
    ├── forms.js
    └── script.js
```

---

## 💡 Common Mistakes

### Mistake 1: Wrong Port
```javascript
// If your server runs on different port:
const API_BASE_URL = 'http://localhost:3001/api';  // Change to your port
```

### Mistake 2: Mixing Protocols
```
// Don't mix file:// with http://
file:///C:/project/Html/home.html  ❌
// Use:
http://localhost:3000/Html/home.html  ✅
```

### Mistake 3: Forgetting /api/ prefix
```javascript
fetch('/orders')  // ❌
fetch('/api/orders')  // ✅
```

---

## ✅ Success Indicators

You'll know it's working when:
- ✅ `http://localhost:3000/api/health` returns success JSON
- ✅ No errors in server terminal
- ✅ Forms submit successfully
- ✅ Green notifications appear
- ✅ Data appears in database

---

## 📞 Quick Commands

```bash
# Start server
cd backend && npm start

# Kill port 3000 (if stuck)
npx kill-port 3000

# Check what's on port 3000
netstat -ano | findstr :3000

# View database
cd backend/database
sqlite3 restaurant.db
SELECT * FROM orders;
```

---

**If you're still stuck, share:**
1. What URL you're trying to access
2. Any error messages from browser console (F12)
3. Any error messages from backend terminal
4. Screenshot if possible

