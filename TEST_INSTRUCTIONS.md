# 🧪 Testing Instructions

## ⚠️ IMPORTANT: How to Access the Website

### ❌ WRONG WAY (Don't do this):
- Double-clicking HTML files
- Opening from File Explorer
- URLs like: `file:///C:/Users/.../Html/home.html`

### ✅ CORRECT WAY (Always do this):

**Step 1: Start the server**
```bash
cd backend
npm start
```

**Step 2: Open browser and type ONE of these:**
```
http://localhost:3000
```
OR
```
http://localhost:3000/Html/home.html
```

---

## 🔍 What You're Seeing

If you see this in your browser:
```json
{"success":false,"message":"Route not found"}
```

**It means:** You're accessing a page incorrectly OR JavaScript isn't loading.

---

## ✅ How to Test Properly

### Test 1: Access Home Page
1. Make sure server is running (terminal shows "Server running on port 3000")
2. Open browser
3. Type: `http://localhost:3000`
4. You should see the home page (NOT JSON)

### Test 2: Add Items to Cart
1. Click on "Eastern food🍲" in navigation
2. You should see food items
3. Click "Add to cart" on any item
4. Cart counter should increase
5. Click "Cart" button
6. You should see items in cart

### Test 3: Place Order
1. With items in cart, click "Delivery" button
2. You should see a form (NOT JSON)
3. Fill in:
   - Name: Test User
   - Phone: 01234567890
   - Address: 123 Test St
4. Click "Send"
5. You should see GREEN notification: "Order placed successfully!"
6. NOT see JSON in browser

---

## 🐛 If You See JSON Error

### Scenario A: Seeing JSON when you click "Send"

**Problem:** JavaScript not preventing form submission

**Solution:** Press F12, go to Console tab, look for errors like:
- "api is not defined"
- "Failed to load script"
- Any red errors

### Scenario B: Seeing JSON when you open a page

**Problem:** Accessing pages wrong way

**Solution:** 
1. Close all browser tabs
2. Make sure server is running
3. Open NEW tab
4. Type: `http://localhost:3000`
5. Navigate using the menu

---

## 📝 Step-by-Step Test

Follow these EXACT steps:

1. **Start Server:**
   ```bash
   cd C:\Users\Softlaptop\Desktop\fd-project\backend
   npm start
   ```
   Wait for: "Server running on port 3000"

2. **Open Browser:**
   - Open Chrome/Edge/Firefox
   - Type in address bar: `http://localhost:3000`
   - Press Enter

3. **Check Home Page:**
   - You should see "Welcome to Nile Bites"
   - You should see navigation menu
   - NO JSON should appear

4. **Browse Menu:**
   - Click "Eastern food🍲"
   - You should see food items with pictures
   - NO JSON should appear

5. **Add to Cart:**
   - Click "Add to cart" on "Molokhia" (first item)
   - Cart button should show "1"
   - NO JSON should appear

6. **Open Cart:**
   - Click "Cart" button at top
   - Sidebar should slide in from right
   - You should see "Molokhia" in cart
   - NO JSON should appear

7. **Go to Delivery:**
   - Click "Delivery" button in cart
   - You should see delivery form
   - NO JSON should appear

8. **Submit Order:**
   - Fill name: Test User
   - Fill phone: 01234567890
   - Fill address: 123 Test Street
   - Click "Send" button
   - Should see green notification: "Order placed successfully!"
   - Should redirect to home page
   - NO JSON should appear

---

## 🔧 If Step Fails

### If Step 3 fails (Home page shows JSON):
- You're not accessing through server
- Server might not be running
- Check URL is `http://localhost:3000` NOT `file://`

### If Step 8 fails (Clicking Send shows JSON):
1. Press F12
2. Go to Console tab
3. Take screenshot
4. Look for errors

---

## 🎯 Quick Debug

Open browser console (F12) and type:

```javascript
console.log('API loaded?', typeof api);
console.log('API base:', API_BASE_URL);
```

**Expected output:**
```
API loaded? object
API base: http://localhost:3000/api
```

**If you see:**
```
API loaded? undefined
```
Then `api.js` is not loading!

---

## 📸 Screenshot What You See

Please share:
1. What URL is in your browser address bar
2. What you see on the page (HTML form or JSON?)
3. Browser console (F12) errors
4. Terminal where server is running

---

## ✅ Success Looks Like

When everything works:
- ✅ No JSON visible on any page
- ✅ Forms appear properly styled
- ✅ Can add items to cart
- ✅ Can submit forms
- ✅ See green success notifications
- ✅ Data saves to database

